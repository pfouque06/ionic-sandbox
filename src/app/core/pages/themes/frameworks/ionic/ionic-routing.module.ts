import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicPage } from './ionic.page';

const routes: Routes = [
  {
    path: '',
    component: IonicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicPageRoutingModule {}
