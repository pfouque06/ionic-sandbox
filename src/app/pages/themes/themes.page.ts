import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IMenuList } from '../../shared/components/directive/menu-list/menu-list.component';
import { UItoolingService } from '../../shared/services/UITooling.service';

@Component({
  selector: 'app-themes',
  templateUrl: 'themes.page.html',
  styleUrls: ['themes.page.scss']
})
export class ThemesPage {


  public paneEnabled: boolean = false;
  public menuRequestEmitter: Subject<any> = new Subject<any>();
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
      label: 'callback test01',
      callback: 'test01',
      icon: 'construct',
    },
    {
      label: 'Goodies',
      icon: 'color-palette',
      submenu: [
        {
          label: 'callback test02',
          callback: 'test02',
          icon: 'construct',
        },
        {
          label: 'Emojis',
          link: '/tabs/themes/emojis',
          icon: 'pizza',
        },
        {
          label: 'Icons',
          link: '/tabs/themes/font-awesome-icons',
          icon: 'logo-ionic',
        },
        {
          label: 'Spinners & Bars',
          link: '/tabs/themes/spinners',
          icon: 'reload-outline',
        },
        {
          label: 'QR & Bar codes ...',
          icon: 'color-palette',
          submenu: [
            {
              label: 'callback test03',
              callback: 'test03',
              icon: 'construct',
            },
            {
              label: 'QRCode Generator',
              data: 'true',
              icon: 'qr-code-outline',
            },
            {
              label: 'QRCode Scan',
              data: 'true',
              icon: 'scan-circle-outline',
            },
            {
              label: 'BarCode Scan',
              data: 'true',
              icon: 'barcode-outline',
            },
          ],
        },
      ],
    },
    {
      label: 'Frameworks ...',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Ionic ...',
          icon: 'logo-ionic',
          submenu: [
            {
            label: 'Badge',
            link: '/tabs/themes/badge',
            icon: 'pricetag',
            },
            {
              label: 'Chip',
              data: 'true',
              icon: 'hardware-chip',
            },
            {
              label: 'Grid',
              data: 'true',
              icon: 'grid',
            },
            {
              label: 'List',
              data: 'true',
              icon: 'list',
            },
            {
              label: 'Nav',
              data: 'true',
              icon: 'albums',
            },
            {
              label: 'Reordering',
              data: 'true',
              icon: 'git-compare',
            },
            {
              label: 'Infinite Scroll',
              data: 'true',
              icon: 'infinite',
            },
            {
              label: 'Modal & Popover',
              data: 'true',
              icon: 'duplicate',
            },
          ],
        },
        {
          label: 'Materials stuff ...',
          icon: 'logo-angular',
          submenu: [
            {
              label: 'Menu',
              data: 'true',
              icon: 'ellipsis-vertical',
            },
            {
              label: 'Toolbar',
              data: 'true',
              icon: 'menu',
            },
            {
              label: 'Tabs',
              data: 'true',
              icon: 'albums',
            },
            {
              label: 'Collapse',
              data: 'true',
              icon: 'archive',
            },
            {
              label: 'Picker',
              data: 'true',
              icon: 'options',
            },
            {
              label: 'Ripples',
              data: 'true',
              icon: 'radio',
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
              icon: 'document-text',
            },
            {
              label: 'Pickers',
              data: 'true',
              icon: 'options',
            },
          ],
        },
      ],
    },
  ]
  
  constructor(private menuCtl: MenuController, private UITooling: UItoolingService ) { console.log('themes'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'themes');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

  public menuWillClose() {
    this.menuRequestEmitter.next();
  }

  callbackReceiverSwitch(callbackId: string) {
    const message = `callbackReceiverSwitch( callbackId: ${callbackId} )`;
    // console.log(message);
    this.UITooling.fireAlert(callbackId,'info');
  }
}
