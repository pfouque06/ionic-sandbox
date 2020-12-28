import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  { path: '', component: DashboardPage,children: [
    // { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule) },
    // { path: 'features', loadChildren: () => import('./features/features.module').then( m => m.FeaturesPageModule) }
  ]},
  // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
