import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IconsPage } from './icons.page';

const routes: Routes = [
  {
    path: '',
    component: IconsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconsPageRoutingModule {}
