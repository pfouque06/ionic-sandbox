import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapLibreForVectorMapPage } from './map-libre-for-vector-map.page';

const routes: Routes = [
  {
    path: '',
    component: MapLibreForVectorMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapLibreForVectorMapPageRoutingModule {}
