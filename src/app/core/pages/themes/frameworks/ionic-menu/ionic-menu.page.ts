import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

export interface ITopic {
  topic: string;
  icon_name: string;
  icon_color: string;
  title: string;
}
@Component({
  selector: 'app-ionic-menu',
  templateUrl: './ionic-menu.page.html',
  styleUrls: ['./ionic-menu.page.scss'],
})
export class IonicMenuPage implements OnInit {

  public topics: any = [
    {
      topic: 'badges',
      icon_name: 'pricetag',
      icon_color: 'primary',
      title: 'badges'
    },
    {
      topic: 'chips',
      icon_name: 'hardware-chip',
      icon_color: 'primary',
      title: 'chips'
    },
    {
      topic: 'fab',
      icon_name: 'ellipsis-vertical-outline',
      icon_color: 'primary',
      title: 'floating action button'
    },
    {
      topic: 'gesture',
      icon_name: 'move',
      icon_color: 'primary',
      title: 'gesture trials'
    },
    {
      topic: 'grids',
      icon_name: 'grid',
      icon_color: 'primary',
      title: 'grids'
    },
    {
      topic: 'list',
      icon_name: 'list',
      icon_color: 'primary',
      title: 'list'
    },
    {
      topic: 'refresher',
      icon_name: 'reload',
      icon_color: 'primary',
      title: 'list with Refresher'
    },
    {
      topic: 'infinite',
      icon_name: 'infinite',
      icon_color: 'primary',
      title: 'list with infinite scroll'
    },
    {
      topic: 'modal',
      icon_name: 'duplicate',
      icon_color: 'primary',
      title: 'modal & popover'
    },
    {
      topic: 'reorder',
      icon_name: 'git-compare',
      icon_color: 'primary',
      title: 'reorder'
    },
    {
      topic: 'segment',
      icon_name: 'code-working',
      icon_color: 'primary',
      title: 'segment'
    }
  ];

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  public goTopic(topic: any) {
    this.nav.navigateForward(`/tabs/themes/ionic/${topic.topic}`);
  }

}
