import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { MyGestureHandlerPageRoutingModule } from './my-gesture-handler-routing.module';
import { MyGestureHandlerPage } from './my-gesture-handler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyGestureHandlerPageRoutingModule
  ],
  declarations: [MyGestureHandlerPage]
})
export class MyGestureHandlerPageModule {}
