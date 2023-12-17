import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { InfoModalComponent } from '../components/info-modal/info-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true);
        } else {
          return this.presentInfoModal().then(() => {
            return false;
          });
        }
      })
    );
  }

  async presentInfoModal() {
    const modal = await this.modalController.create({
      component: InfoModalComponent
    });

    await modal.present();
    return modal.onDidDismiss();
  }
}

