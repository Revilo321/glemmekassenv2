import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async signUp(email: string, password: string){
    console.log(email, password)
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(email: string, password: string) {
    console.log(email, password)
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

}
