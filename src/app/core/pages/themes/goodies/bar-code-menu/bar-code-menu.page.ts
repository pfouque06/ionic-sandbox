import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as JsBarcode from 'jsbarcode';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

export const QRSCAN_PAGE = '/tabs/themes/barcode-menu';
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
  public BarCodeInput = ' ';
  @ViewChild('barCodeInput') public barCodeInput: ElementRef;

  // Scanner
  public pageUrl: string;
  public barCodeValue = '';
  public barCodeFormat = '';
  public scanActive = false;
  public scanFound = false;
  // ngx-barcode-scanner
  @ViewChild(BarcodeScannerLivestreamComponent) public barcodeScanner: BarcodeScannerLivestreamComponent;

  // @ViewChild('video', {static: false }) video: ElementRef;
  // @ViewChild('canvas', {static: false }) canvas: ElementRef;
  // public videoElement: any;
  // public canvasElement: any;
  // public canvasContext: any;


  constructor( private platform: Platform, private router: Router, private ref: ChangeDetectorRef ) {
    const isInStandAloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandAloneMode()) { console.log('I am a PWA iOS !'); }
  }

  public ngOnInit() {
    this.pageUrl = this.router.url || QRSCAN_PAGE;
  }

  ngAfterViewInit() {
    // Sampler
    JsBarcode(this.barCodeSampleSVG.nativeElement, this.barCodeSample, { width: 1, fontSize: 12, });
    // Generator
    JsBarcode(this.barCodeInput.nativeElement, this.BarCodeInput, { width: 1, fontSize: 12, });
    // Scanner
    // this.videoElement = this.video.nativeElement;
    // this.canvasElement = this.canvas.nativeElement;
    // this.canvasContext  = this.canvasElement.getContext('2d');
  }

  public ngOnDestroy() {
    this.releaseVideo();
  }

  public onInputChange(value) {
    console.log('onInputChange()', value);
    if (value) {
      JsBarcode(this.barCodeInput.nativeElement, this.BarCodeInput, { width: 1, fontSize: 12, });
    } else {
      JsBarcode(this.barCodeInput.nativeElement, ' ', { width: 1, fontSize: 12, });
    }
  }

  public onValueChanges(result: QuaggaJSResultObject) {
    console.log('onValueChanges():', result.codeResult.code, result.codeResult.format);
    this.getScanResult(result);
    this.stopScan();
  }

  public onStarted(isStarted: boolean) {
    console.log('scan started');
    this.scanActive = true;
  }

  public async startScan() {
    console.log('startScan()');

    // reset Scan
    this.resetScan();

    // ngx-barcode-scanner
    this.barcodeScanner.start();

    // // start video stream
    // if ( ! this.videoElement?.srcObject) {
    //   console.log('fetching new video stream from Navigator');
    //   this.videoElement = this.video.nativeElement;
    //   const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }});
    //   this.videoElement.srcObject = stream;
    //   this.videoElement.setAttribute('playsinline', true);
    // }
    // this.videoElement.play();
    // // refresh page
    // // this.ref.markForCheck();
    // // start scanning process
    // requestAnimationFrame(this.scan.bind(this));

    // this.scanActive = true;
  }

  public resetScan() {
    console.log('resetScan()');
    this.scanFound = false;
    // this.videoElement = null;
    // refresh page
    // this.ref.markForCheck();
  }

  public stopScan() {
    if (this.scanActive) {
      console.log('stopScan()');

      // ngx-barcode-scanner
      this.barcodeScanner.stop();

      this.pauseVideo();
      // this.releaseVideo();
      // // refresh page
      // // this.ref.markForCheck();
    }
  }

  public pauseVideo() {
    console.log('pauseVideo()');
    this.scanActive = false;
    // this.videoElement.pause();
  }

  public releaseVideo() {
    console.log('releaseVideo()');
    // if ( this.videoElement.srcObject ) {
    //   // stop stream's tracks
    //   this.videoElement.srcObject.getTracks().forEach( (track) => track.stop() );
    //   // release media stream to navigator
    //   // delete this.videoElement.srcObject
    //   this.videoElement.srcObject = null;
    // }
  }


  // public async scan() {
  //   // check that active page is still this one and stop, release video if not the case
  //   if ( this.router.url !== this.pageUrl) {
  //     console.log(`scan() - url has moved to ${this.router.url}, stopping worthless scan and release back media streams to navigator!`);
  //     this.stopScan();
  //   }

  //   if (this.scanActive) {
  //     if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
  //       // capture image from video stream
  //       this.canvasElement.height = this.videoElement.videoHeight;
  //       this.canvasElement.width = this.videoElement.videoWidth;
  //       this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.height, this.canvasElement.width);
  //       const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.height, this.canvasElement.width);
  //       // console.log('scan() - process Image scanning');
  //       // scan captured image
  //       const scanResult = '';

  //       if (! scanResult) {
  //         // console.log('scan() - no result yet');
  //         // restart image capture
  //         requestAnimationFrame(this.scan.bind(this));
  //       } else {
  //         // console.log('scan() --> QR code found!');
  //         this.pauseVideo();
  //         // this.getScanResult(scanResult.data);
  //       }
  //     } else {
  //       // console.log('scan() - video stream not ready yet');
  //       requestAnimationFrame(this.scan.bind(this));
  //     }
  //   }
  // }

  public getScanResult(barCode: QuaggaJSResultObject) {
    console.log(`getScanResult()`);
    this.scanFound = true;
    this.barCodeValue = barCode.codeResult.code;
    this.barCodeFormat = barCode.codeResult.format;
  }

  public onTabChanged($event: MatTabChangeEvent) {
    const SelectedTabIndex = $event.index;
    const SelectedTabLabel = $event.tab.textLabel;
    console.log(`onTabChanged(${SelectedTabIndex}, ${SelectedTabLabel})`);
    if ( SelectedTabLabel !== 'Scan' ) {
      // if ( this.scanFound ) { this.pauseVideo();}
      // else { this.stopScan(); }
      this.stopScan();
    }
  }
}
