import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../components/register/register.component';



@NgModule({
  declarations: [HeaderComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class SharedModule { }
