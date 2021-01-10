import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpinnersPage } from './spinners.page';

const routes: Routes = [
  {
    path: '',
    component: SpinnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpinnersPageRoutingModule {}
