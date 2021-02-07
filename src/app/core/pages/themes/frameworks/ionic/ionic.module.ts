import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicPageRoutingModule } from './ionic-routing.module';
import { IonicPage } from './ionic.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    IonicPageRoutingModule
  ],
  declarations: [IonicPage]
})
export class IonicPageModule {}
