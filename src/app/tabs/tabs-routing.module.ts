import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
  { path: 'tabs', component: TabsPage, children: [
      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
      { path: 'tab1', loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule) },
      { path: 'tab2', loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule) },
      { path: 'tab3', loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule) },
      { path: 'tab-map', loadChildren: () => import('../tab-map/tab-map.module').then(m => m.TabMapPageModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
