import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as JsBarcode from 'jsbarcode';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

export const QRSCAN_PAGE = '/tabs/themes/barcode-menu';
export const JSBARCODE_OPTIONS = { width: 1, fontSize: 12, };

@Component({
  selector: 'app-bar-code-menu',
  templateUrl: './bar-code-menu.page.html',
  styleUrls: ['./bar-code-menu.page.scss'],
})
export class BarCodeMenuPage implements OnInit, AfterViewInit, OnDestroy {

  // Sampler
  public barCodeSample = 'https://ionic.demo.pfouque.fr';
  @ViewChild('barCodeSampleSVG') public barCodeSampleSVG: ElementRef;

  // Generator
  public BarCodeInput: string;
  @ViewChild('barCodeInputSVG') public barCodeInputSVG: ElementRef;

  // Scanner
  public pageUrl: string;
  public barCodeValue: string;
  public barCodeFormat: string;
  public scanActive = false;
  public scanFound = false;
  @ViewChild('barCodeScanSVG') public barCodeScanSVG: ElementRef;
  // ngx-barcode-scanner
  @ViewChild(BarcodeScannerLivestreamComponent) public barcodeScanner: BarcodeScannerLivestreamComponent;

  constructor( private platform: Platform, private router: Router, private ref: ChangeDetectorRef ) {
    const isInStandAloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandAloneMode()) { console.log('I am a PWA iOS !'); }
  }

  public ngOnInit() {
    this.pageUrl = this.router.url || QRSCAN_PAGE;
  }

  ngAfterViewInit() {
    // Sampler
    JsBarcode(this.barCodeSampleSVG.nativeElement, this.barCodeSample, JSBARCODE_OPTIONS);
    // Generator
    JsBarcode(this.barCodeInputSVG.nativeElement, this.BarCodeInput, JSBARCODE_OPTIONS);
    // Scanner
    JsBarcode(this.barCodeScanSVG.nativeElement, this.barCodeValue, JSBARCODE_OPTIONS);
  }

  public ngOnDestroy() {
    this.stopScan();
  }

  public onInputChange(value) {
    // console.log('onInputChange()', value);
    if (value) { JsBarcode(this.barCodeInputSVG.nativeElement, value, JSBARCODE_OPTIONS); }
  }

  public onValueChanges(result: QuaggaJSResultObject) {
    console.log('onValueChanges():', result.codeResult.code, result.codeResult.format);
    this.getScanResult(result);
    this.stopScan();
  }

  public onStarted(isStarted: boolean) {
    this.scanActive = isStarted;
    console.log(`--> scan ${this.scanActive ? 'started' : 'stopped'}`);
  }

  public async startScan() {
    console.log('startScan()');
    // reset Scan
    this.resetScan();
    // ngx-barcode-scanner
    this.barcodeScanner.start();
  }

  public resetScan() {
    console.log('resetScan()');
    this.scanFound = false;
    this.barCodeValue = this.barCodeFormat = null;
    // refresh page
    // this.ref.markForCheck();
  }

  public stopScan() {
    if (this.scanActive) {
      console.log('stopScan()');
      this.scanActive = false;
      // ngx-barcode-scanner
      this.barcodeScanner.stop();
      // refresh page
      // this.ref.markForCheck();
    }
  }

  public getScanResult(barCode: QuaggaJSResultObject) {
    console.log(`getScanResult()`);
    this.scanFound = true;
    this.barCodeValue = barCode.codeResult.code;
    this.barCodeFormat = barCode.codeResult.format;
    if (this.barCodeValue) { 
      JsBarcode(this.barCodeScanSVG.nativeElement, this.barCodeValue, JSBARCODE_OPTIONS);
      console.log(`--> found: ${this.barCodeValue} [format: ${this.barCodeFormat}]`);
    }
  }

  public onTabChanged($event: MatTabChangeEvent) {
    const SelectedTabIndex = $event.index;
    const SelectedTabLabel = $event.tab.textLabel;
    console.log(`onTabChanged(${SelectedTabIndex}, ${SelectedTabLabel})`);
    if ( SelectedTabLabel !== 'Scan' ) { this.stopScan(); }
  }
}
