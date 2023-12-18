import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: any = {};
  Name: string = '';
  email: string = '';
  phoneNumber: string = '';
  userID: string = '';


  constructor(private authService: AuthService, private userService: UserService , private router: Router) {
  }

  logOut(){
    this.authService.signOut().then(() => {
      this.router.navigate(['tabs/tab1'])
    })
  }

  ionViewWillEnter(){
    this.getUserByFirebase();
  }

  getUserByFirebase(){
    this.authService.getCurrentUser().subscribe(user => {
      this.userID = user!.uid;
      this.getUserByDB(this.userID);
    })
  }

  getUserByDB(uid: string){
    this.userService.getUser(uid).subscribe(user => {
      this.user = user;
      this.phoneNumber = this.formatPhoneNumber(user.phone);
    })
  }

  formatPhoneNumber(phone: string): string {
    let digits = phone.replace(/\D/g, '');
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

}