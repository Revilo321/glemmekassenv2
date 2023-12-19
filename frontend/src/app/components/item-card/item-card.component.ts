import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Item } from 'src/app/types/ItemType';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  isCheckedOut: boolean = false;
  isCreator: boolean = false;
  changeColorIfCreator: boolean = false;
  @Output() itemUpdated = new EventEmitter<void>();
  @Input() currentUserUid: string = '';
  @Input() currentUserUid2: string = '';
  @Input() item: Item = {
    id: 1,
    title: 'Hund',
    name: 'Jens Jensen',
    location: 'Slagelse',
    dateTime: '01/12-23 kl 12:00',
    description: 'Min hund er løbet væk',
  };

  ngOnInit() {
    this.currentUserUid === this.item.userUid
      ? (this.isCreator = true)
      : (this.isCreator = false);

      this.currentUserUid2 === this.item.userUid
      ? (this.changeColorIfCreator = true)
      : (this.changeColorIfCreator = false);
  }

  toggleCheckout(event: any) {
    if (event) {
      this.isCheckedOut = !this.isCheckedOut;
    }
  }

  gotoChat(uid: string) {
    this.router.navigate(['/tabs/messages', uid]);
  }

  async openEditModal(post: any) {
    const modal = await this.modalController.create({
      component: EditModalComponent,
      componentProps: {
        post: post,
      },
    });

    await modal.present();

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.dismissed) {
        this.itemUpdated.emit();
      }
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.itemUpdated.emit();
      },
    });
  }

  async presentDeleteConfirm(postId: number) {
    const alert = await this.alertController.create({
      header: 'Bekræft',
      message: 'Er du sikker på at du vil slette dette opslag?',
      buttons: [
        {
          text: 'Tilbage',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ja tak',
          handler: () => {
            this.deleteItem(postId);
          }
        }
      ]
    });
  
    await alert.present();
  }

  constructor(
    private router: Router,
    private modalController: ModalController,
    private itemService: ItemService,
    private alertController: AlertController
  ) {}
}
