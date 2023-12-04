import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent  implements OnInit {
  @Input() foundOrLost: boolean = false;
  @Input() isCreator: boolean = false;

  editCard() {
    console.log("edit card")
  }

  constructor() { }

  ngOnInit() {}

}
