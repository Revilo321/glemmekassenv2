import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  endpoint: string = `${apiUrl}/api/user`;

  async registerUserInBackend(userData: any) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }

    const body = {
      uid: user.uid,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      age: +userData.age,
      zipcode: +userData.zipcode,
      city: userData.city
    };

    return this.http.post(this.endpoint, body).subscribe({
      next: res => {
      },
      error: err => {
      }
    });
  }

  getUserName(uid: string): Observable<any> {
    return this.http.get(`${this.endpoint}/name/${uid}`);
  }

}
