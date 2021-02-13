import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicMenuPageRoutingModule } from './ionic-menu-routing.module';
import { IonicMenuPage } from './ionic-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    IonicMenuPageRoutingModule
  ],
  declarations: [IonicMenuPage]
})
export class IonicMenuPageModule {}
