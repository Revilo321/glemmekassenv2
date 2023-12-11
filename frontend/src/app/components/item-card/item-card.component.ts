import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/types/ItemType';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  isCheckedOut: boolean = false;
  isCreator: boolean = false;
  @Input() currentUserUid: string = '';
  @Input() item: Item = {
    title: 'Hund',
    name: 'Jens Jensen',
    location: 'Slagelse',
    dateTime: '01/12-23 kl 12:00',
    description: 'Min hund er løbet væk'
  };


  ngOnInit() {
    this.currentUserUid === this.item.userUid ? this.isCreator = true : this.isCreator = false;
  }
  editCard() {
    console.log("edit card")
  }

  toggleCheckout(event: any) {
    if(event){
      this.isCheckedOut = !this.isCheckedOut;
    }
  }

  gotoChat(uid: string){
    this.router.navigate(['/tabs/messages',uid])
  }

  constructor(private router: Router) { }

}
