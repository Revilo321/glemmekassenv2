import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from './user.service';
import { Observable, last, map, switchMap } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private storage: AngularFireStorage) {}

  async signUp(formValues: any){
    try {
      await this.afAuth.createUserWithEmailAndPassword(formValues.email, formValues.password).then(res => {
        return res.user?.updateProfile({
          displayName: formValues.name
        })
      });
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

  uploadFile(file: File): Observable<string> {
    const filePath = `images/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }

}
