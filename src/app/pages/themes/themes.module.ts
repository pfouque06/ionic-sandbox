import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ThemesPage } from './themes.page';
import { ThemesPageRoutingModule } from './themes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ThemesPageRoutingModule
  ],
  declarations: [ThemesPage]
})
export class ThemesPageModule {}
