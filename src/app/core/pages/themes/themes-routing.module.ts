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
    { path: 'qrcode-generator', loadChildren: () => import('./goodies/qrcode-generator/qrcode-generator.module').then( m => m.QRcodeGeneratorPageModule) },
    { path: 'qrcode-scan', loadChildren: () => import('./goodies/qrcode-scan/qrcode-scan.module').then( m => m.QRcodeScanPageModule) },
    { path: 'barcode-scan', loadChildren: () => import('./goodies/barcode-scan/barcode-scan.module').then( m => m.BarcodeScanPageModule) },
    { path: 'my-menu', loadChildren: () => import('./goodies/my-menu/my-menu.module').then( m => m.MyMenuPageModule) },
    { path: 'ionic', loadChildren: () => import('./frameworks/ionic/ionic.module').then( m => m.IonicPageModule) },
    { path: 'materials', loadChildren: () => import('./frameworks/materials/materials.module').then( m => m.MaterialsPageModule) },
    { path: 'inputs', loadChildren: () => import('./frameworks/inputs/inputs.module').then( m => m.InputsPageModule) },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesPageRoutingModule {}
