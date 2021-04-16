import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { BarCodeMenuPageRoutingModule } from './bar-code-menu-routing.module';
import { BarCodeMenuPage } from './bar-code-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BarCodeMenuPageRoutingModule
  ],
  declarations: [BarCodeMenuPage]
})
export class BarCodeMenuPageModule {}
