import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent  implements OnInit {
  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchQuery);
    this.clearSearch()
  }

  clearSearch() {
    this.searchQuery = '';
  }

  constructor() {}


  ngOnInit() {}

}
