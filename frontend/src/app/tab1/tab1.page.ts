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
export class Tab1Page {
  isLoading: boolean = true;
  activeFilters: string[] = [];
  isLostItems: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: firebase.User | null = null;
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(
    private authService: AuthService,
    private itemService: ItemService
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ionViewWillEnter() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      const savedFilters = localStorage.getItem('activeFilters');
      if (savedFilters) {
        this.activeFilters = JSON.parse(savedFilters);
        this.fetchFilteredItems();
      } else {
        this.loadItems();
      }
    });
  }

  loadItems() {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.filterItems('found');
      this.isLoading = true;
    });
  }

  filterItems(filter: SegmentValue | undefined) {
    const filterType = filter || 'lost';
    if (filterType === 'lost' || filterType === 'found') {
      this.filteredItems = this.items.filter(
        (item) => item.itemType === filter
      );
    } else {
      this.filteredItems = [...this.items];
    }
  }

  applyZipcodeFilter(event: any) {
    let zipcode = '';
    if (typeof event === 'string') {
      zipcode = event;
    } else if (event && event.target && event.target.value) {
      zipcode = event.target.value;
    }

    if (zipcode && !this.activeFilters.includes(zipcode)) {
      this.activeFilters.push(zipcode);
      localStorage.setItem('activeFilters', JSON.stringify(this.activeFilters));
      this.fetchFilteredItems();
    }
  }

  removeFilter(filter: string) {
    const index = this.activeFilters.indexOf(filter);
    if (index > -1) {
      this.activeFilters.splice(index, 1);
      localStorage.setItem('activeFilters', JSON.stringify(this.activeFilters));
      this.fetchFilteredItems();
    }
  }

  fetchFilteredItems() {
    const filterString = this.activeFilters.join(',');
    this.itemService.getFilteredItems(filterString).subscribe({
      next: (res) => {
        this.items = res;
        this.filterItems(this.isLostItems ? 'lost' : 'found');
        this.isLoading = false;
      },
      error: (err) => console.error('Error fetching filtered posts:', err),
    });
  }

  handleSegmentChange(selectedSegment: string) {
    this.filterItems(selectedSegment);
    this.isLostItems = selectedSegment === 'lost' ? true : false;
  }

  logOut() {
    this.authService.signOut().then(() => {});
  }
}
