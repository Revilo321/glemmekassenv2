import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.page.html',
  styleUrls: ['./chat-overview.page.scss'],
})
export class ChatOverviewPage implements OnInit {
  chats: any[] = [];

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.getChats(user?.uid!);
    })
  }

  getChats(uid: string) {
    this.chatService.getChats(uid).subscribe({
      next: (data: any[]) => {
        this.chats = data.map(user => {
          let lastMessageText = 'No messages yet';
          let lastMessageCreatedAt = '';
  
          if (user.SentMessages.length > 0 && user.ReceivedMessages.length > 0) {
            const lastSentMessage = user.SentMessages[0];
            const lastReceivedMessage = user.ReceivedMessages[0];
            const lastSentDate = new Date(lastSentMessage.latestMessageCreatedAt);
            const lastReceivedDate = new Date(lastReceivedMessage.latestMessageCreatedAt);
            if (lastSentDate > lastReceivedDate) {
              lastMessageText = lastSentMessage.latestMessageText;
              lastMessageCreatedAt = lastSentMessage.latestMessageCreatedAt;
            } else {
              lastMessageText = lastReceivedMessage.latestMessageText;
              lastMessageCreatedAt = lastReceivedMessage.latestMessageCreatedAt;
            }
          } else if (user.SentMessages.length > 0) {
            
            lastMessageText = user.SentMessages[0].latestMessageText;
            lastMessageCreatedAt = user.SentMessages[0].latestMessageCreatedAt;
          } else if (user.ReceivedMessages.length > 0) {
            
            lastMessageText = user.ReceivedMessages[0].latestMessageText;
            lastMessageCreatedAt = user.ReceivedMessages[0].latestMessageCreatedAt;
          }
  
          return {
            name: user.name,
            uid: user.uid,
            latestMessageText: lastMessageText,
            latestMessageCreatedAt: lastMessageCreatedAt
          };
        });
      },
      error: (error) => {
        console.error('Error fetching chats:', error);
      },
      complete: () => {
        console.log('Chat fetch complete');
      }
    });
  }

  openChat(otherUserUid: string) {
    this.router.navigate(['/messages', otherUserUid]); // Replace with your actual route
  }

}
