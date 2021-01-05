import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';

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
      label: 'Goodies',
      icon: 'color-palette',
      submenu: [
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
          label: 'Spinner',
          link: '/tabs/themes/spinners',
          icon: 'reload-outline',
        },
        {
          label: 'QR & Bar codes ...',
          icon: 'color-palette',
          submenu: [
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
            icon: 'logo-ionic',
            },
            {
              label: 'Chip',
              data: 'true',
              icon: 'logo-ionic',
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
              label: 'Picker',
              data: 'true',
              icon: 'options',
            },
            {
              label: 'Collapse',
              data: 'true',
              icon: 'archive',
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
  
  constructor(private menuCtl: MenuController) { console.log('themes'); }

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
}
