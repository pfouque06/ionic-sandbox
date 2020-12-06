import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserPopoverPageRoutingModule } from './user-popover-routing.module';
import { UserPopoverPage } from './user-popover.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    UserPopoverPageRoutingModule
  ],
  declarations: [UserPopoverPage]
})
export class UserPopoverPageModule {}
