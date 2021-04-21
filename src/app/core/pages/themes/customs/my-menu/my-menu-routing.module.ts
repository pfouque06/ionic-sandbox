import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMenuPage } from './my-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MyMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMenuPageRoutingModule {}
