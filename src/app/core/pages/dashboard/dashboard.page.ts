import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'koa-services';
import { Observable, Subject } from 'rxjs';
import { IMenuList } from 'src/app/shared/components/directive/menu-list/menu-list.component';
import { UItoolingService } from 'src/app/shared/services/UITooling.service';

@Component({
  selector: 'app-dahsboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  public profileType$: Observable<string>;
  public fullName$: Observable<string>;
  public paneEnabled: boolean = false;
  public menuRequestEmitter: Subject<any> = new Subject<any>();
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
  
  public adminMenuRequestEmitter: Subject<any> = new Subject<any>();
  public adminMenuList: IMenuList[] = [
    {
      label: 'Admin...',
      icon: 'settings',
      submenu: [
        {
          label: 'Users menu',
          icon: 'people',
          submenu: [
            
            {
              label: 'Add a user',
              link: '/tabs/dashboard/form',
              icon: 'person-add',
            },
            {
              label: 'User table reset',
              callback: 'user-table-reset',
              icon: 'stopwatch-sharp',
            },
          ],
        },
        {
          label: 'Admin menu',
          icon: 'settings',
          submenu: [
            
            {
              label: 'Sessions list',
              data: 'true',
              icon: 'people',
            },
            {
              label: 'Sessions reset',
              callback: 'session-table-reset',
              icon: 'stopwatch-sharp',
            },
          ],
        },
      ],
    },
  ]

  constructor(private authService: AuthService, private menuCtl: MenuController, private UITooling: UItoolingService) { console.log('dashboard'); }

  ngOnInit() {
    // define observers
    this.profileType$ = this.authService.getCurrentUserProfileType$();
    this.fullName$ = this.authService.getCurrentUserFullName$();
  }

  async ionViewWillEnter() {
    this.paneEnabled = true;
    const menuId = await this.menuCtl.enable(true, 'dashboard');
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
  }

  public menuWillClose() {
    this.menuRequestEmitter.next();
    this.adminMenuRequestEmitter.next();
  }

  callbackReceiverSwitch(callbackId: string) {
    const message = `callbackReceiverSwitch( callbackId: ${callbackId} )`;
    // console.log(message);
    this.UITooling.fireAlert(callbackId,'info');
  }
}
