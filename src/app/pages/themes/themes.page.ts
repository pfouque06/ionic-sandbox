import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-themes',
  templateUrl: 'themes.page.html',
  styleUrls: ['themes.page.scss']
})
export class ThemesPage {

  constructor(private menuCtl: MenuController) { console.log('themes'); }

  // async ionViewWillEnter() {
  //   console.log('themes.ionViewWillEnter()');
  //   this.menuCtl.enable(true, 'themesId');
  //   console.log(
  //     await this.menuCtl.getMenus(),
  //     await this.menuCtl.get()
  //   );
  // }

  // ionViewWillLeave() {
  //   console.log('themes.ionViewWillLeave()');
  //   // this.menuCtl.close('themesId');
  //   this.menuCtl.close();
  // }
}
