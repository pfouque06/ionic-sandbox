import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPopoverPage } from './user-popover.page';

const routes: Routes = [
  {
    path: '',
    component: UserPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPopoverPageRoutingModule {}
