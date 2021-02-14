import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialsMenuPageRoutingModule } from './materials-menu-routing.module';
import { MaterialsMenuPage } from './materials-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MaterialsMenuPageRoutingModule
  ],
  declarations: [MaterialsMenuPage]
})
export class MaterialsMenuPageModule {}
