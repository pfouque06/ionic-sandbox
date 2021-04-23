import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';

export interface IMenuList {
  label: string;
  link?: string;
  href?: string;
  data?: string;
  callback?: string;
  icon?: string;
  img?: string;
  submenu?: IMenuList[];
  open?: boolean;
  transmitter?: Subject<string>;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit, OnDestroy {

  @Input() public menu: IMenuList[];
  @Input() public menuId: string;
  @Input() public menuLevel = 0;
  @Input() public multi = false;
  @Input() public closeOnExit = false;

  // Event receiver from parent
  @Input() transmitter: Subject<string> = undefined;

  // Event emitter to parent
  @Output() menuListEvent: EventEmitter<string> = new EventEmitter<string>();

  public subscriptions: Subscription[] = [];

  constructor(private menuCtl: MenuController) { }

  ngOnInit() {
    // Initiate submenus' emitter
    this.menu.filter( (menuItem) => menuItem.submenu )
      .forEach( (menuItem) => { menuItem.transmitter = new Subject<string>();  });
    // subscribe to parent menu emitter
    this.subscriptions.push(this.transmitter?.subscribe((message) => this.parentMessageResolver(message)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public parentMessageResolver(message: string) {
    // console.log('parentMessageResolver', message, this.menuLevel);
    switch (message) {
      case 'close':
        if (this.closeOnExit) { this.closeAll(); }
        break;
      default:
        this.emitAll(message);
    }
  }

  public subMenuToggle(item: IMenuList) {
    // debugger;
    // if multi attribute is set, interact with openState of submenus
    if (!this.multi) {
      if (item.open) {
        // recursively close all item's opened submenu on opening
        this.emitToSubmenu(item, 'close');
      } else {
        // recursively close any other opened submenus on opening this submenu
        this.closeAll();
      }
    }
    item.open = ! item.open;
  }

  public closeAll() {
    this.menu.filter( (item) => item.open && item.transmitter )
    .forEach( (item) => {
      this.emitToSubmenu(item, 'close');
      item.open = false;
    });
  }

  public emitAll(message: string) {
    this.menu.filter( (item) => item.open && item.transmitter )
    .forEach( (item) => { this.emitToSubmenu(item, message); });
  }

  public emitToSubmenu(item: IMenuList, message: string) {
    item.transmitter?.next(message);
  }

  // resolve event from submenu
  public submenuEventResolver(event: string) {
    // console.log('submenuEventResolver', event, this.menuLevel);
    switch (event) {
      default:
        // Forward child submenu event to parent
        this.menuListEvent.emit(event);
    }
  }

  // Emit event to parent
  public callbackRequestInit(item: IMenuList) {
    // console.log('callbackRequestInit', item.callback, this.menuLevel);
    this.menuListEvent.emit(item.callback);
  }
}
