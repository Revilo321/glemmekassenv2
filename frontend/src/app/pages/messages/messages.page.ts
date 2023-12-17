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
  isUserTyping = false;
  isLoading = true;
  messages: any[] = [];
  senderName = '';
  messageContent = '';
  otherUserFirebaseUid = '';
  currentUserFirebaseUid = '';

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(() => {
      this.setupSocketListeners();
      this.initializeChat();
    });
  }

  private setupSocketListeners() {
    this.socketService.onNewMessage((message: any) => {
      this.messages.push(message);
      this.scrollToBottom(100);
    });

    this.socketService.onUserTyping((data) => {
      if (data.senderId === this.otherUserFirebaseUid) {
        this.isUserTyping = true;
      }
    });

    this.socketService.onUserStoppedTyping((data) => {
      if (data.senderId === this.otherUserFirebaseUid) {
        this.isUserTyping = false;
      }
    });
  }

  private initializeChat() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserFirebaseUid = user?.uid!;
      this.otherUserFirebaseUid = this.route.snapshot.paramMap.get('id')!;
      this.fetchOtherUserDetails(this.otherUserFirebaseUid);
      this.fetchMessages(this.currentUserFirebaseUid, this.otherUserFirebaseUid);
    });
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
    this.chatService.getConversation(currentUserUid, otherUserUid).subscribe({
      next: messages => {
        this.messages = messages.map((message: any) => ({
          senderId: message.senderId,
          receiverId: message.receiverId,
          senderName: message.Sender?.name || message.senderName,
          text: message.text,
          time: message.createdAt || message.time,
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log("Error fetching messages",err)
      }
    }
    );
  }

  isMyMessage(message: any): boolean {
    return message.senderId === this.currentUserFirebaseUid;
  }

  scrollToBottom(ms: number) {
    setTimeout(() => this.content.scrollToBottom(300), ms);
  }

  ionViewDidEnter() {
    this.showOrHideTabs('none');
    this.initializeChat();
    this.scrollToBottom(2000);
  }

  ionViewWillLeave() {
    this.showOrHideTabs('flex');
  }

  private showOrHideTabs(style: string) {
    const tabBar = document.getElementById('app-tab-bar');
    const fabButton = document.getElementById('chat-fab');
    if (tabBar && fabButton) {
      tabBar.style.display = style;
      fabButton.style.display = style;
    }
  }

  fetchOtherUserDetails(uid: string) {
    if (uid) {
      this.userService.getUserName(uid).subscribe(name => {
        this.senderName = name
      });
    }
  }

  startTyping() {
    this.socketService.emitTypingEvent(
      this.currentUserFirebaseUid,
      this.otherUserFirebaseUid,
      true
    );
  }

  stopTyping() {
    this.socketService.emitTypingEvent(
      this.currentUserFirebaseUid,
      this.otherUserFirebaseUid,
      false
    );
  }
}
