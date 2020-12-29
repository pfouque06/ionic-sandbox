import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: MapPage }]),
    MapPageRoutingModule,
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
