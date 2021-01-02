import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

export interface IMenuList {
  label: string;
  link?: string;
  href?: string;
  data?: string;
  icon?: string;
  img?: string;
  submenu?: IMenuList[];
  open?: boolean;
}

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input() public menu: IMenuList[];
  @Input() public menuId: string;
  @Input() public menuLevel: number = 0;
  @Input() public multi: boolean = false; 
  
  constructor(private menuCtl: MenuController) { }

  ngOnInit() { }

  public subMenuToggle(item: IMenuList) {
    // close all opened on opening except if multi attirbute is set
    if (!this.multi && !item.open) {
      this.menu.filter( (menuItem) => menuItem.open )
        .forEach( (menuItem) => menuItem.open = false );
    }
    item.open = ! item.open;
  }
}
