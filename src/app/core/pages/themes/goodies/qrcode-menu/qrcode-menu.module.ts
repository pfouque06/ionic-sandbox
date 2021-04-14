import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { QRCodeMenuPageRoutingModule } from './qrcode-menu-routing.module';
import { QRCodeMenuPage } from './qrcode-menu.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QRCodeMenuPageRoutingModule
  ],
  declarations: [QRCodeMenuPage]
})
export class QRCodeMenuPageModule {}
