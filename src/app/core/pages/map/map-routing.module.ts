import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPage } from './map.page';

const routes: Routes = [
  { path: '', component: MapPage,children: [
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
    { path: 'leaflet', loadChildren: () => import('./leaflet-for-raster-map/leaflet-for-raster-map.module').then( m => m.LeafletForRasterMapPageModule) },
    { path: 'mapLibre', loadChildren: () => import('./map-libre-for-vector-map/map-libre-for-vector-map.module').then( m => m.MapLibreForVectorMapPageModule) },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageRoutingModule {}
