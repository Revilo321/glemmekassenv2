import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

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
    console.log(body)
    return this.http.post('http://localhost:8080/api/user', body).subscribe({
      next: res => {
      },
      error: err => {
      }
    });
  }
}
