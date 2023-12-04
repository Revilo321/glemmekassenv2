import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/types/ItemType';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent{
  isCheckedOut: boolean = false;
  @Input() foundOrLost: boolean = false;
  @Input() isCreator: boolean = false;
  @Input() item: Item = {
    title: 'Hund',
    name: 'Jens Jensen',
    location: 'Slagelse',
    dateTime: '01/12-23 kl 12:00',
    description: 'Min hund er løbet væk'
  };



  editCard() {
    console.log("edit card")
  }

  toggleCheckout(event: any) {
    if(event){
      this.isCheckedOut = !this.isCheckedOut;
    }
  }

  constructor() { }

}
