import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { SandboxPage } from './sandbox.page';
import { SandboxPageRoutingModule } from './sandbox-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SandboxPageRoutingModule
  ],
  declarations: [SandboxPage]
})
export class SandboxPageModule {}
