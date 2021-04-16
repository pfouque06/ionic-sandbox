import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as JsBarcode from 'jsbarcode';


@Component({
  selector: 'app-bar-code-menu',
  templateUrl: './bar-code-menu.page.html',
  styleUrls: ['./bar-code-menu.page.scss'],
})
export class BarCodeMenuPage implements OnInit, AfterViewInit {

  public barcodeSample = 'https://ionic.demo.pfouque.fr';
  @ViewChild('barCodeSample') public barCodeSample: ElementRef;
  
  public BarCodeInput = ' ';
  @ViewChild('barCodeInput') public barCodeInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    JsBarcode(this.barCodeSample.nativeElement, this.barcodeSample, { width: 1, fontSize: 12, });
    JsBarcode(this.barCodeInput.nativeElement, this.BarCodeInput, { width: 1, fontSize: 12, });
  }
  
  public onInputChange(value) {
    console.log('onInputChange()', value);
    if (value) {
      JsBarcode(this.barCodeInput.nativeElement, this.BarCodeInput, { width: 1, fontSize: 12, });
    } else {
      JsBarcode(this.barCodeInput.nativeElement, ' ', { width: 1, fontSize: 12, });
    }
  }

  public onTabChanged($event: MatTabChangeEvent) {
    const SelectedTabIndex = $event.index;
    const SelectedTabLabel = $event.tab.textLabel;
    console.log(`onTabChanged(${SelectedTabIndex}, ${SelectedTabLabel})`);
    // if ( SelectedTabLabel !== "Scan" ) {
    //   if ( this.scanFound ) { this.pauseVideo();}
    //   else { this.stopScan(); } 
    // }
  }
}
