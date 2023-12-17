import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  navigateToLogin() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/tabs/login');
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
