import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabHeaderComponent } from './directive/tab-header/tab-header.component';
import { TabFakeHeaderComponent } from './directive/tab-fake-header/tab-fake-header.component';
import { TabFooterComponent } from './directive/tab-footer/tab-footer.component';
import { MenuListComponent } from './directive/menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { TeaserBetaVersionComponent } from './directive/teaser-beta-version/teaser-beta-version.component';
import { TeaserComingSoonComponent } from './directive/teaser-coming-soon/teaser-coming-soon.component';
import { FullWidthTitleComponent } from './directive/full-width-title/full-width-title.component';


const components = [
  TabHeaderComponent,
  TabFakeHeaderComponent,
  TabFooterComponent,
  MenuListComponent,
  TeaserBetaVersionComponent,
  TeaserComingSoonComponent,
  FullWidthTitleComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ComponentsModule {}
