import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  async signUp(email: string, password: string){

    console.log(email, password)
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    await this.userService.registerUserInBackend();
  }

  async signIn(email: string, password: string) {
    console.log(email, password)
    console.log(this.afAuth.idToken.subscribe(res => console.log(res)));
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

}
