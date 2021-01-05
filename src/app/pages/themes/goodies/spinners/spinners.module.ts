import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpinnersPageRoutingModule } from './spinners-routing.module';

import { SpinnersPage } from './spinners.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SpinnersPageRoutingModule
  ],
  declarations: [SpinnersPage]
})
export class SpinnersPageModule {}
