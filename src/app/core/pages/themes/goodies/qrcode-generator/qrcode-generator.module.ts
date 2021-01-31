import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { QRcodeGeneratorPageRoutingModule } from './qrcode-generator-routing.module';
import { QRcodeGeneratorPage } from './qrcode-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QRcodeGeneratorPageRoutingModule
  ],
  declarations: [QRcodeGeneratorPage]
})
export class QRcodeGeneratorPageModule {}
