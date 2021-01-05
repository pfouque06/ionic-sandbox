import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmojisPageRoutingModule } from './emojis-routing.module';

import { EmojisPage } from './emojis.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EmojisPageRoutingModule
  ],
  declarations: [EmojisPage]
})
export class EmojisPageModule {}
