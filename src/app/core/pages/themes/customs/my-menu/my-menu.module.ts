import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { MyMenuPageRoutingModule } from './my-menu-routing.module';
import { MyMenuPage } from './my-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyMenuPageRoutingModule
  ],
  declarations: [MyMenuPage]
})
export class MyMenuPageModule {}
