import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  messages: any[] = [];
  messageContent: string = '';

  constructor(private socketService: SocketService) {}
  ngOnInit() {
    this.socketService.onConnect.subscribe(() => {
      this.socketService.onNewMessage((message: any) => {
        console.log("Received message:", message);
        this.messages.push(message);
      });
    });
  }

  ngOnDestroy() {
    this.socketService.onConnect.unsubscribe();
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      const newMessage = {
        name: 'You',
        text: this.messageContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'assets/avatar-placeholder.png'
      };
      this.messages.push(newMessage);
      const currentUserFirebaseUid = 'gni02uRHMQYLsVBGjnB7gg2YUk12';
      const targetUserFirebaseUid = 'pSyqdivraMPueFPeMbLzBr7KKfl2';
      this.socketService.sendMessage(this.messageContent, currentUserFirebaseUid, targetUserFirebaseUid);
      this.messageContent = '';
    }
  }


}
