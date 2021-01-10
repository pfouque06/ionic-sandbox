import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { SessionsPageRoutingModule } from './sessions-routing.module';
import { SessionsPage } from './sessions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SessionsPageRoutingModule
  ],
  declarations: [SessionsPage]
})
export class SessionsPageModule {}
