import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsfeedPage } from './newsfeed.page';

const routes: Routes = [
  {
    path: '',
    component: NewsfeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsfeedPageRoutingModule {}
