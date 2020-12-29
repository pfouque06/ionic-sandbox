import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabFooterComponent } from './directive/tab-footer/tab-footer.component';
import { TabHeaderComponent } from './directive/tab-header/tab-header.component';
// import { TranslateModule } from '@ngx-translate/core';
// import { IonicSelectableModule } from 'ionic-selectable';
// import { NgxChartsModule } from '@swimlane/ngx-charts';


const components = [
  TabHeaderComponent,
  TabFooterComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    // IonicSelectableModule,
    // NgxChartsModule,
    // TranslateModule.forChild()
  ],
})
export class ComponentsModule {}
