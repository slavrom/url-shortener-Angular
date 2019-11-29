import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShortenerComponent } from './shortener/shortener.component';
import { ItemDetailsComponent } from './item-details/item-details.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shortener', component: ShortenerComponent },
  { path: 'shortener/item-details/:id', component: ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
