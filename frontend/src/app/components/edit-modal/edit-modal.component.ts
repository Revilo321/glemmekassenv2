import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Input() post: any;

  constructor(private modalController: ModalController) { 
  }

  dismissModal(){
    this.modalController.dismiss({'dismissed': false});
  }

}
