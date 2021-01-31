import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IMenuList } from '../../../shared/components/directive/menu-list/menu-list.component';
import { UItoolingService } from '../../../shared/services/UITooling.service';

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
      icon: 'home',
      link: '/tabs/themes/home',
    },
    {
      label: 'Sandbox',
      icon: 'construct',
      link: '/tabs/themes/sandbox',
    },
    {
      label: 'Goodies',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Emojis',
          icon: 'pizza',
          link: '/tabs/themes/emojis',
        },
        {
          label: 'Icons',
          icon: 'logo-ionic',
          link: '/tabs/themes/icons',
        },
        {
          label: 'Spinners & Bars',
          icon: 'reload-outline',
          link: '/tabs/themes/spinners',
        },
        {
          label: 'QR & Bar codes',
          icon: 'color-palette',
          submenu: [
            {
              label: 'QRCode Generator',
              icon: 'qr-code-outline',
              link: '/tabs/themes/qrcode-generator',
            },
            {
              label: 'QRCode Scan',
              icon: 'scan-circle-outline',
              link: '/tabs/themes/qrcode-scan',
            },
            {
              label: 'BarCode Scan',
              icon: 'barcode-outline',
              link: '/tabs/themes/barcode-scan',
            },
          ],
        },
        {
          label: 'My Custom components ...',
          icon: 'color-palette',
          submenu: [
            {
              label: 'Recursive Menu',
              icon: 'ellipsis-vertical',
              link: '/tabs/themes/my-menu',
            },
          ],
        },
      ],
    },
    {
      label: 'Frameworks',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Ionic stuff ...',
          icon: 'logo-ionic',
          submenu: [
            {
            label: 'Badge',
            icon: 'pricetag',
            link: '/tabs/themes/badge',
            },
            {
              label: 'Chip',
              icon: 'hardware-chip',
              data: 'true',
            },
            {
              label: 'Grid',
              icon: 'grid',
              data: 'true',
            },
            {
              label: 'List',
              icon: 'list',
              data: 'true',
            },
            {
              label: 'Toolbar',
              icon: 'menu',
              data: 'true',
            },
            {
              label: 'Nav',
              icon: 'albums',
              data: 'true',
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
              icon: 'duplicate',
              data: 'true',
            },
            {
              label: 'Gesture trials',
              icon: 'move',
              data: 'true',
            },
          ],
        },
        {
          label: 'Materials stuff ...',
          icon: 'logo-angular',
          link: '/tabs/themes/materials',
          // submenu: [
          //   {
          //     label: 'Menu',
          //     data: 'true',
          //     icon: 'ellipsis-vertical',
          //   },
          //   {
          //     label: 'Tabs',
          //     data: 'true',
          //     icon: 'albums',
          //   },
          //   {
          //     label: 'Espansion panel',
          //     data: 'true',
          //     icon: 'archive',
          //   },
          //   {
          //     label: 'Picker',
          //     data: 'true',
          //     icon: 'options',
          //   },
          //   {
          //     label: 'Stepper',
          //     data: 'true',
          //     icon: 'options',
          //   },
          //   {
          //     label: 'Ripples',
          //     data: 'true',
          //     icon: 'radio',
          //   },
          //   {
          //     label: 'Drag & Drop',
          //     data: 'true',
          //     icon: 'git-compare',
          //   },
          // ],
        },
        {
          label: 'Inputs stuff ...',
          icon: 'color-palette',
          link: '/tabs/themes/inputs',
        },
      ],
    },
    {
      label: 'callback test01',
      icon: 'construct',
      callback: 'test01',
    },
    {
      label: 'callback menu01',
      icon: 'construct',
      submenu: [
        {
          label: 'callback test02',
          icon: 'construct',
          callback: 'test02',
        },
        {
          label: 'callback menu02',
          icon: 'construct',
          submenu: [
            {
              label: 'callback test03',
              icon: 'construct',
              callback: 'test03',
            }
          ]
        },
      ]
    }
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
