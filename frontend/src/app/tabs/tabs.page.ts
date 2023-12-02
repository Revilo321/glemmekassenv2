import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    })
  }

  navigateToProfileOrLogin(){
    if(this.isLoggedIn){
      this.router.navigate(['tabs/profile']);
    } else {
      this.router.navigate(['tabs/login']);
    }
  }

  navigateToMessages(){
    this.router.navigate(['tabs/chat-overview'])
  }

}
