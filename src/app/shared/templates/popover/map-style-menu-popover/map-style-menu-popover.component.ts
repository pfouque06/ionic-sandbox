import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-map-style-menu-popover',
  templateUrl: './map-style-menu-popover.component.html',
  styleUrls: ['./map-style-menu-popover.component.scss'],
})
export class MapStyleMenuPopoverComponent implements OnInit {

  @ViewChild('styleToggleId', { read: ElementRef }) styleToggleRef: ElementRef;
  @Input() style: any;
  
  constructor(private popper: PopoverController) { }

  ngOnInit() {}

  public  onStyleToggleChange(event) {
    // console.log('onStyleToggleChange(): ', event.detail.value);
    this.popper.dismiss({ dismiss: false, style: event.detail.value});
  }

  dismiss() {
    this.popper.dismiss({ dismiss: true });
  }
}
