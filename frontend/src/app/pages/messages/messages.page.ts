import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  isLoading: boolean = true;
  messages: any[] = [];
  senderName: string = '';
  messageContent: string = '';
  otherUserFirebaseUid: string = '';
  currentUserFirebaseUid: string = '';

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.authService.getCurrentUser().subscribe((user) => {
      this.otherUserFirebaseUid = this.route.snapshot.paramMap.get('id')!;
      this.currentUserFirebaseUid = user?.uid!;
      this.fetchMessages(
        this.currentUserFirebaseUid,
        this.otherUserFirebaseUid
      );
    });
    this.socketService.onConnect.subscribe(() => {
      this.socketService.onNewMessage((message: any) => {
        console.log(message);
        if (!message.senderName) {
          this.userService
            .getUserName(this.otherUserFirebaseUid)
            .subscribe((name: string) => {
              message.senderName = name;
              this.messages.push(message);
            });
        } else {
          this.messages.push(message);
        }
        this.scrollToBottom(100);
      });
    });
    this.scrollToBottom(2000);
  }
  ngOnDestroy() {
    this.socketService.onConnect.unsubscribe();
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      const newMessage = {
        senderId: this.currentUserFirebaseUid,
        text: this.messageContent,
        receiverId: this.otherUserFirebaseUid,
        time: new Date().toISOString(),
      };
      this.messages.push(newMessage);
      this.socketService.sendMessage(newMessage);
      this.scrollToBottom(100);
      this.messageContent = '';
    }
  }

  fetchMessages(currentUserUid: string, otherUserUid: string) {
    this.chatService.getConversation(currentUserUid, otherUserUid).subscribe(
      (messages) => {
        this.messages = messages.map((message: any) => {
          this.senderName = message.Sender.name || message.senderName;
          this.isLoading = false;
          return {
            senderId: message.senderId,
            receiverId: message.receiverId,
            senderName: message.Sender?.name || message.senderName,
            text: message.text,
            time: message.createdAt || message.time,
          };
        });
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  isMyMessage(message: any): boolean {
    const isMine = message.senderId === this.currentUserFirebaseUid;
    return isMine;
  }

  scrollToBottom(ms: number) {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, ms);
  }
}
