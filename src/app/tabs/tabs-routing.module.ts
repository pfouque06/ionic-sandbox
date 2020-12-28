import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from '../shared/guards/is-logged.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  { path: 'tabs', component: TabsPage, children: [
    { path: 'home', loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule) },
    { path: 'themes', loadChildren: () => import('../pages/themes/themes.module').then(m => m.ThemesPageModule) },
    { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivateChild: [IsLoggedGuard]},
    { path: 'map', loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule) },
    { path: '', redirectTo: 'home/welcome', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: '/tabs/home/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
