import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatOverviewPageRoutingModule } from './chat-overview-routing.module';

import { ChatOverviewPage } from './chat-overview.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatOverviewPageRoutingModule,
    SharedModule
  ],
  declarations: [ChatOverviewPage]
})
export class ChatOverviewPageModule {}
