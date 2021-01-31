import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRcodeGeneratorPage } from './qrcode-generator.page';

const routes: Routes = [
  {
    path: '',
    component: QRcodeGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRcodeGeneratorPageRoutingModule {}
