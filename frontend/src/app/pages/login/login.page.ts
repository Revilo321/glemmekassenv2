import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['tabs/tab1'])
    } catch (error) {
      this.presentToast('Noget gik galt, prøv at logge ind igen!')
      console.error("Error during login", error);
    }
  }

  async register() {
    try {
      await this.authService.signUp(this.registerEmail, this.registerPassword);
      this.presentToast('Sådan, så er du registreret, du kan nu logge ind!')
    } catch (error) {
      this.presentToast('Noget gik galt, tjek formattering af email og password')
      console.error("Error during registration", error);
    }
  }

}
