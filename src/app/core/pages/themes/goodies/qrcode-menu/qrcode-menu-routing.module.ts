import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRCodeMenuPage } from './qrcode-menu.page';

const routes: Routes = [
  {
    path: '',
    component: QRCodeMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRCodeMenuPageRoutingModule {}
