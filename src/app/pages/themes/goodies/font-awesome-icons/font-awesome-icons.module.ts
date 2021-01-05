import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontAwesomeIconsPageRoutingModule } from './font-awesome-icons-routing.module';

import { FontAwesomeIconsPage } from './font-awesome-icons.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FontAwesomeIconsPageRoutingModule
  ],
  declarations: [FontAwesomeIconsPage]
})
export class FontAwesomeIconsPageModule {}
