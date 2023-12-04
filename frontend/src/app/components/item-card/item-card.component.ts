import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent  implements OnInit {
  isCheckedOut: boolean = false;
  @Input() foundOrLost: boolean = false;
  @Input() isCreator: boolean = false;

  editCard() {
    console.log("edit card")
  }

  toggleCheckout(event: any) {
    if(event){
      this.isCheckedOut = !this.isCheckedOut;
      console.log(this.isCheckedOut)
    }
  }

  constructor() { }

  ngOnInit() {}

}
