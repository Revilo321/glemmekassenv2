import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-page-section',
  templateUrl: './header-page-section.component.html',
  styleUrls: ['./header-page-section.component.scss'],
})
export class HeaderPageSectionComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() text: string = '';

  constructor() { }


}
