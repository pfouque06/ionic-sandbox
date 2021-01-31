import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialsPageRoutingModule } from './materials-routing.module';
import { MaterialsPage } from './materials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MaterialsPageRoutingModule
  ],
  declarations: [MaterialsPage]
})
export class MaterialsPageModule {}
