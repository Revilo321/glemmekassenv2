import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat';
import { ItemService } from '../services/item.service';
import { SegmentValue } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  isLostItems: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: firebase.User | null = null;
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private authService: AuthService, private itemService: ItemService) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((user) => {
        this.currentUser = user;
        this.loadItems();
      });
    
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.filterItems('lost');
    });
  }

  filterItems(filter: SegmentValue | undefined) {
    const filterType = filter || 'lost';
    if (filterType === 'lost' || filterType === 'found') {
      this.filteredItems = this.items.filter(item => item.itemType === filter);
    } else {
      this.filteredItems = [...this.items];
    }
  }

  handleSegmentChange(selectedSegment: string) {
    this.filterItems(selectedSegment);
  }

  logOut(){
    this.authService.signOut().then(() => {
    })
  }
}
