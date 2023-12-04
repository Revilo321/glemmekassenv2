import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatOverviewPage } from './chat-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ChatOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatOverviewPageRoutingModule {}
