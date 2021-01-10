import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserFormPageRoutingModule } from './user-form-routing.module';
import { UserFormPage } from './user-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UserFormPageRoutingModule
  ],
  declarations: [UserFormPage]
})
export class UserFormPageModule {}
