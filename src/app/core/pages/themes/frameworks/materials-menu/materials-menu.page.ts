import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-materials-menu',
  templateUrl: './materials-menu.page.html',
  styleUrls: ['./materials-menu.page.scss'],
})
export class MaterialsMenuPage implements OnInit {

  public topics: any = [
    {
      topic: 'menu',
      icon_name: 'ellipsis-vertical',
      icon_color: 'medium',
      title: 'menu'
    },
    {
      topic: 'tabs',
      icon_name: 'albums',
      icon_color: 'medium',
      title: 'tabs'
    },
    {
      topic: 'expansion',
      icon_name: 'archive',
      icon_color: 'medium',
      title: 'expansion panels'
    },
    {
      topic: 'date',
      icon_name: 'options',
      icon_color: 'medium',
      title: 'date picker'
    },
    {
      topic: 'stepper',
      icon_name: 'options',
      icon_color: 'medium',
      title: 'stepper'
    },
    {
      topic: 'ripple',
      icon_name: 'radio',
      icon_color: 'medium',
      title: 'ripple effect'
    },
    {
      topic: 'drag',
      icon_name: 'git-compare',
      icon_color: 'medium',
      title: 'drag & drop'
    }
  ];

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  public goTopic(topic: any) {
    this.nav.navigateForward(`/tabs/themes/materials/${topic.topic}`);
  }
}
