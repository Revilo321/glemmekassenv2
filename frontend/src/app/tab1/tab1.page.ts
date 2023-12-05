import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat';
import { ItemService } from '../services/item.service';

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
    const type = 'lost';
    this.itemService.getItems(type).subscribe(data => {
      this.items = data;
    });
  }

  logOut(){
    this.authService.signOut().then(() => {
    })
  }
}
