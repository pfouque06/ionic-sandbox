import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  
  public paneEnabled: boolean = false;
  public menuList: IMenuList[] = [
    {
      label: 'Welcome',
      link: '/tabs/home/welcome',
      icon: 'newspaper',
    },
    {
      label: 'Features',
      link: '/tabs/home/features',
      icon: 'extension-puzzle-outline',
    },
    {
      label: 'Contact',
      href: 'http://www.pfouque.fr',
      img: '/assets/icon/favicon.png',
    },
  ]
  
  constructor(private menuCtl: MenuController) { console.log('home'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'home');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

}
