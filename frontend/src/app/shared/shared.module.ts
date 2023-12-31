import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../components/register/register.component';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { SegmentControlComponent } from '../components/segment-control/segment-control.component';
import { HeaderPageSectionComponent } from '../components/header-page-section/header-page-section.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { InfoModalComponent } from '../components/info-modal/info-modal.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';
import { CreatePostComponent } from '../components/create-post/create-post.component';
import { ReportComponent } from '../components/report/report.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ItemCardComponent,
    SegmentControlComponent,
    HeaderPageSectionComponent,
    SearchBarComponent,
    InfoModalComponent,
    PageNotFoundComponent,
    EditModalComponent,
    CreatePostComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ItemCardComponent,
    SegmentControlComponent,
    HeaderPageSectionComponent,
    SearchBarComponent,
    InfoModalComponent,
    PageNotFoundComponent,
    EditModalComponent,
    CreatePostComponent,
    ReportComponent
  ]
})
export class SharedModule {}
