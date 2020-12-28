import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  
  public paneEnabled: boolean = false;

  constructor(private menuCtl: MenuController) { console.log('home'); }

  async ionViewWillEnter() {
    console.log('home.ionViewWillEnter()');
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'home');
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
