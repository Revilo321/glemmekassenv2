import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
