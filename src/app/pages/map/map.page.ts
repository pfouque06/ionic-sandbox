import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {

  public paneEnabled: boolean = false;
  public menuList: IMenuList[] = [
    {
      label: 'Home',
      link: '/tabs/map/home',
      icon: 'home',
    },
  ]

  constructor(private menuCtl: MenuController) { console.log('map'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'map');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
