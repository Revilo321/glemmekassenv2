import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {}

  async signUp(formValues: any){
    try {
      await this.afAuth.createUserWithEmailAndPassword(formValues.email, formValues.password);
      const userData = {...formValues}
      delete userData.password;
      await this.userService.registerUserInBackend(userData);
    } catch (err: any) {
      throw new Error('Registration failed' + err.message);
    }
  }

  async signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

}
