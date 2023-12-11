import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.authService.getCurrentUser().subscribe((user) => {
      })
      this.router.navigate(['tabs/tab1'])
    } catch (error) {
      this.toastService.presentErrorToast('Der skete en fejl i login, tjek din adgangskode og email')
      console.error("Error during login", error);
    }
  }



}
