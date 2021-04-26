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

  @Input() public menu: IMenuList[];      // menuList structure
  @Input() public menuId: string;         // menuID for ion-menu-toggle interaction
  @Input() public multi = false;          // if true, allows multiple opened submenus
  @Input() public recursiveClose = false; // if true, recursively close submenus
  @Input() public menuLevel = 0;          // internal use only

  // Event receiver from parent
  // tslint:disable-next-line: no-input-rename
  @Input('transmitter') receiver: Subject<string> = undefined;

  // Event emitter to parent
  // tslint:disable-next-line: no-output-rename
  @Output('receiver') transmitter: EventEmitter<string> = new EventEmitter<string>();

  public subscriptions: Subscription[] = [];

  constructor(private menuCtl: MenuController) { }

  ngOnInit() {
    // console.log(this.multi, this.recursiveClose);
    // Initiate submenus' emitter
    this.menu.filter((menuItem) => menuItem.submenu )
    .forEach((menuItem) => menuItem.transmitter = new Subject<string>() );
    // subscribe to parent menu emitter
    this.subscriptions.push(this.receiver?.subscribe((message) => this.parentMessageResolver(message)));
  }

  ngOnDestroy() { this.subscriptions.forEach((s) => s.unsubscribe()); }

  public parentMessageResolver(message: string) {
    // console.log('parentMessageResolver', message, this.menuLevel);
    switch (message) {
      case 'close': { if (this.recursiveClose) { this.closeAll(); } break; }
      default:
    }
    this.emitAll(message);
  }

  public subMenuToggle(item: IMenuList) {
    // debugger;
    // if multi attribute is unset, close interact with openState of submenus
    if (!this.multi) {
      // recursively close all submenus
      this.emitAll('close');
      // close any other opened submenus on opening this submenu
      if (!item.open) { this.closeAll(); }
    }
    item.open = ! item.open;
  }

  public closeAll() {
    // console.log('closeAll()');
    this.menu.filter((item) => item.open ).forEach( (item) => { item.open = false; });
  }

  public emitAll(message: string) {
    // console.log('emitAll()');
    this.menu.filter((item) => item.transmitter ).forEach( (item) => { this.emitToSubmenu(item, message); });
  }

  public emitToSubmenu(item: IMenuList, message: string) {
    // console.log('emitToSubmenu()', item.label, message);
    item.transmitter?.next(message);
  }

  // resolve event from submenu
  public submenuEventResolver(event: string) {
    // console.log('submenuEventResolver', event, this.menuLevel);
    switch (event) {
      default:
    }
    // Forward child submenu event to parent
    this.transmitter.emit(event);
  }

  // Emit event to parent
  public callbackRequestInit(item: IMenuList) {
    // console.log('callbackRequestInit', item.callback, this.menuLevel);
    this.transmitter.emit(item.callback);
  }
}
