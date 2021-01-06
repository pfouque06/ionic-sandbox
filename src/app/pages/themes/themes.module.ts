import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ThemesPage } from './themes.page';
import { ThemesPageRoutingModule } from './themes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ThemesPageRoutingModule
  ],
  declarations: [ThemesPage]
})
export class ThemesPageModule {}
