import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialsPageRoutingModule } from './materials-routing.module';
import { MaterialsPage } from './materials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    MaterialsPageRoutingModule
  ],
  declarations: [MaterialsPage]
})
export class MaterialsPageModule {}
