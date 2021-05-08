import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IMenuList } from 'src/app/shared/templates/components/custom/menu-list/menu-list.component';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {

  public paneEnabled = false;
  public menuRequestEmitter: Subject<any> = new Subject<any>();
  public menuList: IMenuList[] = [
    {
      label: 'Home',
      link: '/tabs/map/home',
      icon: 'home',
    },
    {
      label: 'MapLibre for Vector maps',
      link: '/tabs/map/mapLibre',
      icon: 'location-sharp',
    },
    {
      label: 'Leaflet for raster maps',
      link: '/tabs/map/leaflet',
      icon: 'leaf',
    },
  ];

  constructor(private menuCtl: MenuController) { console.log('map'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'map');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

  public menuWillClose() {
    this.menuRequestEmitter.next();
  }
}
