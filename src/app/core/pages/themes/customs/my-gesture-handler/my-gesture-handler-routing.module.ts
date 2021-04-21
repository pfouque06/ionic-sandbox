import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyGestureHandlerPage } from './my-gesture-handler.page';

const routes: Routes = [
  {
    path: '',
    component: MyGestureHandlerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyGestureHandlerPageRoutingModule {}
