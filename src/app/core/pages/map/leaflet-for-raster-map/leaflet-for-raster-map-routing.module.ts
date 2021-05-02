import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletForRasterMapPage } from './leaflet-for-raster-map.page';

const routes: Routes = [
  {
    path: '',
    component: LeafletForRasterMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletForRasterMapPageRoutingModule {}
