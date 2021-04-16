import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarCodeMenuPage } from './bar-code-menu.page';

const routes: Routes = [
  {
    path: '',
    component: BarCodeMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarCodeMenuPageRoutingModule {}
