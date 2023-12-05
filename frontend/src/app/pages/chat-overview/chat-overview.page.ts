import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.page.html',
  styleUrls: ['./chat-overview.page.scss'],
})
export class ChatOverviewPage {
  isLoading: boolean = true;
  currentUserId: string = '';
  chats: any[] = [];

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) { }

  ionViewDidEnter() {
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
          let isLastMessageSentByCurrentUser = false;
  
          const lastSentMessage = user.SentMessages[0];
          const lastReceivedMessage = user.ReceivedMessages[0];
          if (lastSentMessage && (!lastReceivedMessage || new Date(lastSentMessage.latestMessageCreatedAt) > new Date(lastReceivedMessage.latestMessageCreatedAt))) {
            lastMessageText = lastSentMessage.latestMessageText;
            lastMessageCreatedAt = lastSentMessage.latestMessageCreatedAt;
            isLastMessageSentByCurrentUser = true;
          } else if (lastReceivedMessage) {
            lastMessageText = lastReceivedMessage.latestMessageText;
            lastMessageCreatedAt = lastReceivedMessage.latestMessageCreatedAt;
            isLastMessageSentByCurrentUser = false;
          }
          this.isLoading = false;
          const newChatObject = {
            name: user.name,
            uid: user.uid,
            latestMessageText: lastMessageText,
            latestMessageCreatedAt: lastMessageCreatedAt,
            isLastMessageSentByCurrentUser
          }
          return newChatObject;
        });
      },
      error: (error) => {
        console.error('Error fetching chats:', error);
      },
      complete: () => {
        
      }
    });
  }

  openChat(otherUserUid: string) {
    this.router.navigate(['/tabs/messages', otherUserUid]);
  }

}
