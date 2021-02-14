import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsMenuPage } from './materials-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialsMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsMenuPageRoutingModule {}
