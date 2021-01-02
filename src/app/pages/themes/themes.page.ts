import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';

@Component({
  selector: 'app-themes',
  templateUrl: 'themes.page.html',
  styleUrls: ['themes.page.scss']
})
export class ThemesPage {


  public paneEnabled: boolean = false;
  public menuList: IMenuList[] = [
    {
      label: 'Home',
      link: '/tabs/themes/home',
      icon: 'home',
    },
    {
      label: 'Sandbox',
      link: '/tabs/themes/sandbox',
      icon: 'construct',
    },
    {
      label: 'Goodies',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Emojis',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Icons',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Spinner',
          data: 'true',
          icon: 'construct',
        },
      ],
    },
    {
      label: 'Ionic stuff ...',
      icon: 'logo-ionic',
      submenu: [
        {
        label: 'Badge',
        link: '/tabs/themes/badge',
        icon: 'construct',
        },
        {
          label: 'Chip',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Grid',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'List',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Nav',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Reordering',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Infinite Scroll',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Modal & Popover',
          data: 'true',
          icon: 'construct',
        },
      ],
    },
    {
      label: 'Materials stuff ...',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Picker',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Collapse',
          data: 'true',
          icon: 'construct',
        },
      ],
    },
    {
      label: 'Inputs stuff ...',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Forms',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'Pickers',
          data: 'true',
          icon: 'construct',
        },
      ],
    },
    {
      label: 'QR & Bar codes ...',
      icon: 'color-palette',
      submenu: [
        {
          label: 'QRCode Generator',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'QRCode Scan',
          data: 'true',
          icon: 'construct',
        },
        {
          label: 'BarCode Scan',
          data: 'true',
          icon: 'construct',
        },
      ],
    },
  ]
  
  constructor(private menuCtl: MenuController) { console.log('themes'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'themes');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
