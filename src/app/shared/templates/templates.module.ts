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
import { IonicAnimationsComponent } from './components/themes/ionic-animations/ionic-animations.component';
import { IonicBadgesComponent } from './components/themes/ionic-badges/ionic-badges.component';
import { IonicChipsComponent } from './components/themes/ionic-chips/ionic-chips.component';
import { IonicFabsComponent } from './components/themes/ionic-fabs/ionic-fabs.component';
import { IonicGesturesComponent } from './components/themes/ionic-gestures/ionic-gestures.component';
import { IonicGridsComponent } from './components/themes/ionic-grids/ionic-grids.component';
import { IonicInputsComponent } from './components/themes/ionic-inputs/ionic-inputs.component';
import { IonicListsComponent } from './components/themes/ionic-lists/ionic-lists.component';
import { IonicInfiniteScrollComponent } from './components/themes/ionic-infinite-scroll/ionic-infinite-scroll.component';
import { IonicModalsPopoversComponent } from './components/themes/ionic-modals-popovers/ionic-modals-popovers.component';
import { IonicReorderComponent } from './components/themes/ionic-reorder/ionic-reorder.component';
import { IonicSegmentsComponent } from './components/themes/ionic-segments/ionic-segments.component';
import { DoubleTapDirective } from './directives/double-tap.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { SwipeXDirective } from './directives/swipe-x.directive';


const templates = [
  TabHeaderComponent,
  TabFakeHeaderComponent,
  TabFooterComponent,
  MenuListComponent,
  TeaserBetaVersionComponent,
  TeaserComingSoonComponent,
  FullWidthTitleComponent,
  ProfileUserDetailsComponent,
  IonicAnimationsComponent,
  IonicBadgesComponent,
  IonicChipsComponent,
  IonicFabsComponent,
  IonicGesturesComponent,
  IonicGridsComponent,
  IonicInputsComponent,
  IonicListsComponent,
  IonicInfiniteScrollComponent,
  IonicModalsPopoversComponent,
  IonicReorderComponent,
  IonicSegmentsComponent,
  DoubleTapDirective,
  LongPressDirective,
  SwipeXDirective,
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
