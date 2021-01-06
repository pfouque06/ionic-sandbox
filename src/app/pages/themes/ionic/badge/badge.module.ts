import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { BadgePage } from './badge.page';
import { BadgePageRoutingModule } from './badge-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BadgePageRoutingModule
  ],
  declarations: [BadgePage]
})
export class BadgePageModule {}
