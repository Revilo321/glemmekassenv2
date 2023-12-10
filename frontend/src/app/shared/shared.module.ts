import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../components/register/register.component';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ReportComponent } from '../components/report/report.component';

@NgModule({
  declarations: [HeaderComponent, LoginComponent, RegisterComponent, ItemCardComponent, ReportComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ItemCardComponent,
    ReportComponent,
  ]
})
export class SharedModule { }
