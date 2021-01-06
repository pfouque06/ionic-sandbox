import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardPage } from './dashboard.page';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardPage }]),
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
