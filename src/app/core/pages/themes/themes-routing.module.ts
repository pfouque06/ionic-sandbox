import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemesPage } from './themes.page';

const routes: Routes = [
  { path: '', component: ThemesPage,children: [
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
    { path: 'sandbox', loadChildren: () => import('./sandbox/sandbox.module').then( m => m.SandboxPageModule) },
    { path: 'badge', loadChildren: () => import('./ionic/badge/badge.module').then( m => m.BadgePageModule) },
    { path: 'emojis', loadChildren: () => import('./goodies/emojis/emojis.module').then( m => m.EmojisPageModule) },
    { path: 'icons', loadChildren: () => import('./goodies/icons/icons.module').then( m => m.IconsPageModule) },
    { path: 'spinners', loadChildren: () => import('./goodies/spinners/spinners.module').then( m => m.SpinnersPageModule) },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesPageRoutingModule {}
