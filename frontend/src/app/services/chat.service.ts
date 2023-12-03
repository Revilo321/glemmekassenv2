import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private readonly endpoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { 
    this.socket = io(this.endpoint);
  }

  getChats(currentUserId: string): Observable<any>{
    return this.http.get(`${this.endpoint}/api/user/chats/${currentUserId}`)
  }

  getConversation(currentUserUid: string, otherUserUid: string): Observable<any>{
    return this.http.get(`${this.endpoint}/api/messages/${currentUserUid}/${otherUserUid}`)
  }

  sendMessage(message: any): void {
    this.socket.emit('sendMessage', message);
  }

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (message: any) => {
        observer.next(message);
      });
    });
  }
}
