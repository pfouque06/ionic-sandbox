import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPage } from './map.page';

const routes: Routes = [
  { path: '', component: MapPage,children: [
    // { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule) },
    // { path: 'features', loadChildren: () => import('./features/features.module').then( m => m.FeaturesPageModule) }
  ]},
  // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageRoutingModule {}
