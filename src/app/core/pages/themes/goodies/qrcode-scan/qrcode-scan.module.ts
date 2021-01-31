import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { QRcodeScanPageRoutingModule } from './qrcode-scan-routing.module';
import { QRcodeScanPage } from './qrcode-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QRcodeScanPageRoutingModule
  ],
  declarations: [QRcodeScanPage]
})
export class QRcodeScanPageModule {}
