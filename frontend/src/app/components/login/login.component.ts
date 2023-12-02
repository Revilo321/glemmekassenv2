import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<string>();

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.authService.getCurrentUser().subscribe((user) => {
        console.log("run?")
      })
      this.router.navigate(['tabs/tab1'])
    } catch (error) {
      this.loggedIn.emit('Noget gik galt, prøv at logge ind igen!')
      console.error("Error during login", error);
    }
  }



}
