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
      topic: 'animations',
      icon_name: 'videocam',
      icon_color: 'primary',
      title: 'animations'
    },
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
      topic: 'gestures',
      icon_name: 'speedometer',
      icon_color: 'primary',
      title: 'gestures'
    },
    {
      topic: 'grids',
      icon_name: 'grid',
      icon_color: 'primary',
      title: 'grids'
    },
    {
      topic: 'inputs',
      icon_name: 'options',
      // icon_name: 'toggle',
      icon_color: 'primary',
      title: 'inputs'
    },
    {
      topic: 'lists',
      icon_name: 'list',
      icon_color: 'primary',
      title: 'lists'
    },
    // {
    //   topic: 'modal',
    //   icon_name: 'duplicate',
    //   icon_color: 'primary',
    //   title: 'modal & popover'
    // },
    {
      topic: 'reorder',
      icon_name: 'git-compare',
      icon_color: 'primary',
      title: 'reorder'
    },
    {
      topic: 'segments',
      icon_name: 'code-working',
      icon_color: 'primary',
      title: 'segments'
    }
  ];

  constructor(public nav: NavController) { console.log('themes/frameworks/ionic'); }

  ngOnInit() {
  }

  public goTopic(topic: any) {
    this.nav.navigateForward(`/tabs/themes/ionic/${topic.topic}`);
  }

}
