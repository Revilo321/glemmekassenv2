import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { apiUrl } from '../constants/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public onConnect: EventEmitter<void> = new EventEmitter();
  firebaseUid = '';
  private url = apiUrl;
  private socket!: Socket;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.firebaseUid = user?.uid!;
      this.connect();
    });
  }

  private connect(): void {
    this.socket = io(this.url);

    this.socket.on('connect', () => {
      this.registerUser(this.firebaseUid);
      this.onConnect.emit();
    });
  }

  sendMessage(newMessage: any): void {
    const message = newMessage
    this.socket.emit('new-message', { message });
  }

  onNewMessage(handler: (message: any) => void) {
    this.socket.on('new-message', handler);
  }

  onUserTyping(handler: (data: any) => void) {
    this.socket.on('userTyping', handler);
  }

  onUserStoppedTyping(handler: (data: any) => void) {
    this.socket.on('userStoppedTyping', handler);
  }

  registerUser(userFirebaseUID: string): void {
    this.socket.emit('register', userFirebaseUID);
  }

  emitTypingEvent(senderId: string, receiverId: string, isTyping: boolean): void {
    const event = isTyping ? 'startTyping' : 'stopTyping';
    this.socket.emit(event, { senderId, receiverId });
  }
}
