import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-themes',
  templateUrl: 'themes.page.html',
  styleUrls: ['themes.page.scss']
})
export class ThemesPage {


  public paneEnabled: boolean = false;
  
  constructor(private menuCtl: MenuController) { console.log('themes'); }

  async ionViewWillEnter() {
    console.log('home.ionViewWillEnter()');
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'themes');
    console.log('menuId: ', menuId);
    // console.log(
    //   await this.menuCtl.getMenus(),
    //   await this.menuCtl.get()
    // );
  }

  ionViewWillLeave() {
    console.log('home.ionViewWillLeave()');
    this.paneEnabled = false;
    // this.menuCtl.close('homeId');
    // this.menuCtl.close();
  }
}
