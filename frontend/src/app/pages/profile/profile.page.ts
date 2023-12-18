import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  posts: any[] = [];
  user: any = {};
  Name: string = '';
  email: string = '';
  phoneNumber: string = '';
  userID: string = '';


  constructor(private authService: AuthService, private userService: UserService , private router: Router, private itemService: ItemService, private modalController: ModalController) {
    this.getUserByFirebase()
  }

  logOut(){
    this.authService.signOut().then(() => {
      this.router.navigate(['tabs/tab1'])
    })
  }

  ionViewWillEnter(){
    this.getUserByDB(this.userID);
    this.fetchItems();
  }

  getUserByFirebase(){
    this.authService.getCurrentUser().subscribe(user => {
      this.userID = user!.uid;
    })
  }

  getUserByDB(uid: string){
    this.userService.getUser(uid).subscribe(user => {
      this.user = user;
      this.phoneNumber = this.formatPhoneNumber(user.phone);
    })
  }

  fetchItems(){
    this.itemService.getItemsOnUid(this.userID).subscribe(items => {
      this.posts = items;
    })
  }

  formatPhoneNumber(phone: string): string {
    let digits = phone.replace(/\D/g, '');
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

}