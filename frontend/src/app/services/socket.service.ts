import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public onConnect: EventEmitter<void> = new EventEmitter();
  firebaseUid = '';
  private url = 'http://localhost:8080/';
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
      console.log('Connected to server');
      this.registerUser(this.firebaseUid);
      this.onConnect.emit();
    });
  }

  sendMessage(message: string, senderId: string, receiverId: string): void {
    console.log(message, senderId, receiverId);
    this.socket.emit('new-message', { message, senderId, receiverId });
  }

  onNewMessage(handler: (message: any) => void) {
    console.log('am i run in the socket service?');
    this.socket.on('new-message', handler);
  }

  registerUser(userFirebaseUID: string): void {
    this.socket.emit('register', userFirebaseUID);
  }
}
