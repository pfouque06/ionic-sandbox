import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputsPage } from './inputs.page';

const routes: Routes = [
  {
    path: '',
    component: InputsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputsPageRoutingModule {}
