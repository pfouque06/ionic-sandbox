import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-ionic',
  templateUrl: './ionic.page.html',
  styleUrls: ['./ionic.page.scss'],
})
export class IonicPage implements OnInit {

  // Ionic reorder group
  // @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @ViewChild('reorder01') reorderGroup01: IonReorderGroup;
  reorderDisabled01 = false;
  handlerEnabled01 = true;
  bucket01 = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
  ];

  @ViewChild('reorderGroup02') reorderGroup02: IonReorderGroup;
  bucket02 = [
    'element 1',
    'element 2',
    'element 3',
    'element 4',
    'element 5',
  ];
  tempBucket02: any[];

  constructor() { }

  ngOnInit() {
    // Ionic Reorder & rename
    this.tempBucket02 = this.bucket02.map((item) => ({ name: item, focus: false }));
  }


  // Ionic reorder group
  public doReorder01(ev: CustomEvent<ItemReorderEventDetail>) {
    // Update the items variable to the new order of items
    this.bucket01 = ev.detail.complete(this.bucket01);
    console.log('Ionic Reorder01: After complete', this.bucket01);
  }
  toggleReorderGroup01() {
    this.reorderDisabled01 = !this.reorderDisabled01;
    this.reorderGroup01.disabled = this.reorderDisabled01;
  }

  public doReorder02(ev: CustomEvent<ItemReorderEventDetail>) {
    // Update the items variable to the new order of items
    this.tempBucket02 = ev.detail.complete(this.tempBucket02);
    console.log('Ionic Reorder02: After complete', this.tempBucket02);
  }
  public reorder02Display(item: any) {
    console.log('item.name: ', item.name);
  }
}
