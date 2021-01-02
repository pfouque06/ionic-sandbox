import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { FeaturesPageRoutingModule } from './features-routing.module';
import { FeaturesPage } from './features.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    FeaturesPageRoutingModule,
  ],
  declarations: [FeaturesPage]
})
export class FeaturesPageModule {}
