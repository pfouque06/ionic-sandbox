import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IMenuList } from '../../../shared/templates/components/custom/menu-list/menu-list.component';
import { UIToolingService } from '../../../shared/services/UITooling.service';

@Component({
  selector: 'app-themes',
  templateUrl: 'themes.page.html',
  styleUrls: ['themes.page.scss']
})
export class ThemesPage {


  public paneEnabled = false;
  public menuListTransmitter: Subject<any> = new Subject<any>();
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
          label: 'QRCode Menu',
          icon: 'qr-code-outline',
          link: '/tabs/themes/qrcode-menu',
        },
        {
          label: 'BarCode Menu',
          icon: 'barcode-outline',
          link: '/tabs/themes/barcode-menu',
        },
      ],
    },
    {
      label: 'Frameworks',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Ionic bench',
          icon: 'logo-ionic',
          link: '/tabs/themes/ionic-menu'
        },
        {
          label: 'Materials bench',
          icon: 'logo-angular',
          link: '/tabs/themes/materials-menu',
        },
      ],
    },
    {
      label: 'My templates',
      icon: 'color-palette',
      submenu: [
        {
          label: 'Gesture handler',
          icon: 'videocam',
          link: '/tabs/themes/my-gesture-handler',
        },
        {
          label: 'Recursive Menu',
          icon: 'ellipsis-vertical',
          submenu: [
            {
              label: 'Description',
              icon: 'construct',
              link: '/tabs/themes/my-menu',
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
        },
      ]
    }
  ];

  constructor(private menuCtl: MenuController, private UITooling: UIToolingService ) { console.log('themes'); }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'themes');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

  public menuWillClose() {
    this.menuListTransmitter.next('close');
  }

  callbackReceiverSwitch(callbackId: string) {
    const message = `callbackReceiverSwitch( callbackId: ${callbackId} )`;
    // console.log(message);
    this.UITooling.fireAlert(callbackId, 'info');
  }
}
