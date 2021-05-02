import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { LeafletForRasterMapPageRoutingModule } from './leaflet-for-raster-map-routing.module';
import { LeafletForRasterMapPage } from './leaflet-for-raster-map.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LeafletForRasterMapPageRoutingModule
  ],
  declarations: [LeafletForRasterMapPage]
})
export class LeafletForRasterMapPageModule {}
