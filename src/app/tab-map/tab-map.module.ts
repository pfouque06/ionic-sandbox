import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabMapPage } from './tab-map.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabMapPageRoutingModule } from './tab-map-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabMapPage }]),
    TabMapPageRoutingModule,
  ],
  declarations: [TabMapPage]
})
export class TabMapPageModule {}
