import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(private authService: AuthService, private router: Router) {
  }

  logOut(){
    this.authService.signOut().then(() => {
      this.router.navigate(['tabs/tab1'])
    })
  }

}
