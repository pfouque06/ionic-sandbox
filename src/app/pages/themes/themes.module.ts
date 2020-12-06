import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemesPage } from './themes.page';
import { ThemesPageRoutingModule } from './themes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ThemesPageRoutingModule
  ],
  declarations: [ThemesPage]
})
export class ThemesPageModule {}
