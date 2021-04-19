import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabHeaderComponent } from './components/global/tab-header/tab-header.component';
import { TabFakeHeaderComponent } from './components/global/tab-fake-header/tab-fake-header.component';
import { TabFooterComponent } from './components/global/tab-footer/tab-footer.component';
import { MenuListComponent } from './components/custom/menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { TeaserBetaVersionComponent } from './components/custom/teaser-beta-version/teaser-beta-version.component';
import { TeaserComingSoonComponent } from './components/custom/teaser-coming-soon/teaser-coming-soon.component';
import { FullWidthTitleComponent } from './components/custom/full-width-title/full-width-title.component';
import { ProfileUserDetailsComponent } from './components/dashboard/profile-user-details/profile-user-details.component';


const templates = [
  TabHeaderComponent,
  TabFakeHeaderComponent,
  TabFooterComponent,
  MenuListComponent,
  TeaserBetaVersionComponent,
  TeaserComingSoonComponent,
  FullWidthTitleComponent,
  ProfileUserDetailsComponent,
];

@NgModule({
  declarations: templates,
  exports: templates,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class TemplatesModule {}
