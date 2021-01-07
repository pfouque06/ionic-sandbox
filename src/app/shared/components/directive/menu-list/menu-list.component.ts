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
  RequestEmitter?: Subject<any>;
}

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit, OnDestroy {

  @Input() public menu: IMenuList[];
  @Input() public menuId: string;
  @Input() public menuLevel: number = 0;
  @Input() public multi: boolean = false;

  // closeRequest event receiver from parent
  @Input() RequestReceiver: Observable<any> = undefined;

  // callbackRequest event emitter to parent 
  @Output() RequestEmitter : EventEmitter<string> = new EventEmitter<string>();
  
  public subscriptions: Subscription[] = [];

  constructor(private menuCtl: MenuController) { }

  ngOnInit() { 
    // Initiate submenus' emitter
    this.menu.filter( (menuItem) => menuItem.submenu )
      .forEach( (menuItem) => { menuItem.RequestEmitter = new Subject<any>();  });
    // subscribe to parent menu emitter
    this.subscriptions.push(this.RequestReceiver?.subscribe(() => this.ReceiveRequestEventfromParent()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public ReceiveRequestEventfromParent() {
    this.closeAll();
  }

  public subMenuToggle(item: IMenuList) {
    // debugger;
    // if multi attribute is set, interact with openState of submenus
    if (!this.multi) {
      if (item.open) {
        // recursively close all item's opened submenu on opening
        this.emitCloseRequestEventToSubMenu(item);
      } else {
        // recursively close all opened submenus on opening
        this.closeAll();
      }
    }
    item.open = ! item.open;
  }

  public closeAll() {
    this.menu.filter( (item) => item.open && item.RequestEmitter )
    .forEach( (item) => {
      this.emitCloseRequestEventToSubMenu(item);
      item.open = false;
    });
  }

  public emitCloseRequestEventToSubMenu(item: IMenuList) {
    item.RequestEmitter?.next();
  }

  // Emit event to parent
  public callbackRequestInit(item: IMenuList) {
    this.RequestEmitter.emit(item.callback);
  }

  // Forward chiuld submenu event to parent
  public callbackReceiverPipe(callbackId: string) {
    this.RequestEmitter.emit(callbackId);
  }
}
