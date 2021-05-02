import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapLibreForVectorMapPageRoutingModule } from './map-libre-for-vector-map-routing.module';

import { MapLibreForVectorMapPage } from './map-libre-for-vector-map.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MapLibreForVectorMapPageRoutingModule
  ],
  declarations: [MapLibreForVectorMapPage]
})
export class MapLibreForVectorMapPageModule {}
