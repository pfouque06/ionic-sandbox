import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';

@Component({
  selector: 'app-dahsboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {

  public paneEnabled: boolean = false;
  public menuList: IMenuList[] = [
    {
      label: 'Home',
      link: '/tabs/dashboard/home',
      icon: 'home',
    },
    {
      label: 'Newsfeed',
      link: '/tabs/dashboard/newsfeed',
      icon: 'newspaper',
    },
    {
      label: 'Profile',
      link: '/tabs/dashboard/profile',
      icon: 'person',
    },
    {
      label: 'Users...',
      link: '/tabs/dashboard/users',
      icon: 'people',
    },
  ]
  
  constructor(private menuCtl: MenuController) { console.log('dashboard'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'dashboard');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
