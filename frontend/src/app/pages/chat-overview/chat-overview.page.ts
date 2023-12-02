import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-overview',
  templateUrl: './chat-overview.page.html',
  styleUrls: ['./chat-overview.page.scss'],
})
export class ChatOverviewPage implements OnInit {
  chats: any[] = [];

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.chatService.getChats(user?.uid!).subscribe((chats) => {
        this.chats = chats;
        console.log(chats)
      })
    })

  }

}
