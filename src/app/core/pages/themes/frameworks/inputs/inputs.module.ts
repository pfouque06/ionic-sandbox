import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { InputsPageRoutingModule } from './inputs-routing.module';
import { InputsPage } from './inputs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    InputsPageRoutingModule
  ],
  declarations: [InputsPage]
})
export class InputsPageModule {}
