import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { SandboxPage } from './sandbox.page';
import { SandboxPageRoutingModule } from './sandbox-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SandboxPageRoutingModule
  ],
  declarations: [SandboxPage]
})
export class SandboxPageModule {}
