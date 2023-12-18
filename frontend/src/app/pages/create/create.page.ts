import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  itemType: string = 'found';
  constructor() {}

  handleSegmentChange(itemType: string) {
    this.itemType = itemType;
  }
}
