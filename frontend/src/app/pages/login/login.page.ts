import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  registerEmail: string = '';
  registerPassword: string = '';


  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      console.log("Logged in successfully!");
    } catch (error) {
      console.error("Error during login", error);
    }
  }

  async register() {
    try {
      await this.authService.signUp(this.registerEmail, this.registerPassword);
      console.log("Registered successfully!");
    } catch (error) {
      console.error("Error during registration", error);
    }
  }

}
