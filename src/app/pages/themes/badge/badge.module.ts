import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { BadgePage } from './badge.page';
import { BadgePageRoutingModule } from './badge-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BadgePageRoutingModule
  ],
  declarations: [BadgePage]
})
export class BadgePageModule {}
