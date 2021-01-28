import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
})
export class SandboxPage implements OnInit {

  // Material Tabs
  tabs = ['First', 'Second'];
  selected = new FormControl(0);
  isAnimated = true;

  // Material Tabs & Nav
  links = ['First', 'Second'];
  activeLink = this.links[0];

  // Material expansoin panel
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  isPanOpened = false;

  // Material Stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  // Material Ripple Effect
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  // Material Drag & Drop
  LockType : 'unLock' | 'xLockAxis' | 'yLockAxis' | 'Lock' = 'unLock';
  items = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
  ];

  // Ionic reorder group
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  handlerEnabled = true;
  bucket = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
  ];

  constructor(private _formBuilder: FormBuilder) { console.log('themes/sandbox'); }

  ngOnInit() {
    // Material Stepper
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // Material Tabs
  public addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  public removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  public resetTabs() {
    this.tabs = ['First', 'Second'];
  }

  // Material Tabs & Nav actions
  public addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  public resetLinks() {
    this.links = this.links.slice(0, 2);
  }

  // Material Expansion Panels
  // public openAllExpansionPanels() { this.accordion.openAll(); }
  // public closeAllExpansionPanels() { this.accordion.closeAll(); }

  // Material Drag & Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex < 0 || event.previousIndex >= this.items.length) { return; }
    if (event.currentIndex < 0 || event.currentIndex >= this.items.length) { return; }
    console.log('Mat Drag: Before complete', this.items);
    // move item in item from previousIndex to currentIndex);
    this.items.splice(event.currentIndex, 0, this.items.splice(event.previousIndex, 1)[0]);
    console.log('Mat Drag: After complete', this.items);
  }

  // Ionic reorder group
  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Ionic Reorder: Before complete', this.bucket);
    // Update the items variable to the new order of items
    this.bucket = ev.detail.complete(this.bucket);
    console.log('Ionic Reorder: After complete', this.bucket);
  }
}
