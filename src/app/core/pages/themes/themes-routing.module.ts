import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemesPage } from './themes.page';

const routes: Routes = [
  { path: '', component: ThemesPage,children: [
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
    { path: 'sandbox', loadChildren: () => import('./sandbox/sandbox.module').then( m => m.SandboxPageModule) },
    { path: 'emojis', loadChildren: () => import('./goodies/emojis/emojis.module').then( m => m.EmojisPageModule) },
    { path: 'icons', loadChildren: () => import('./goodies/icons/icons.module').then( m => m.IconsPageModule) },
    { path: 'spinners', loadChildren: () => import('./goodies/spinners/spinners.module').then( m => m.SpinnersPageModule) },
    { path: 'qrcode-menu', loadChildren: () => import('./goodies/qrcode-menu/qrcode-menu.module').then( m => m.QRCodeMenuPageModule) },
    { path: 'barcode-scan', loadChildren: () => import('./goodies/barcode-scan/barcode-scan.module').then( m => m.BarcodeScanPageModule) },
    { path: 'my-menu', loadChildren: () => import('./goodies/my-menu/my-menu.module').then( m => m.MyMenuPageModule) },
    { path: 'ionic-menu', loadChildren: () => import('./frameworks/ionic-menu/ionic-menu.module').then( m => m.IonicMenuPageModule) },
    { path: 'ionic/:topic', loadChildren: () => import('./frameworks/ionic/ionic.module').then( m => m.IonicPageModule) },
    { path: 'materials-menu', loadChildren: () => import('./frameworks/materials-menu/materials-menu.module').then( m => m.MaterialsMenuPageModule) },
    { path: 'materials/:topic', loadChildren: () => import('./frameworks/materials/materials.module').then( m => m.MaterialsPageModule) },
    { path: 'inputs', loadChildren: () => import('./frameworks/inputs/inputs.module').then( m => m.InputsPageModule) },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesPageRoutingModule {}
