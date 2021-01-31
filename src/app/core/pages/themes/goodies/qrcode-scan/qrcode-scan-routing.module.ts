import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRcodeScanPage } from './qrcode-scan.page';

const routes: Routes = [
  {
    path: '',
    component: QRcodeScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRcodeScanPageRoutingModule {}
