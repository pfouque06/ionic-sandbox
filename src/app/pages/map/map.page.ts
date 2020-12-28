import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {

  public paneEnabled: boolean = false;
  
  constructor(private menuCtl: MenuController) { console.log('map'); }

  async ionViewWillEnter() {
    console.log('home.ionViewWillEnter()');
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'map');
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
