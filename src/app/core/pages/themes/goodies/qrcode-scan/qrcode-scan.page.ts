import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import jsQR from 'jsqr';

export const QRSCAN_PAGE = '/tabs/themes/qrcode-scan';

@Component({
  selector: 'app-qrcode-scan',
  templateUrl: './qrcode-scan.page.html',
  styleUrls: ['./qrcode-scan.page.scss'],
})
export class QRcodeScanPage implements OnInit, AfterViewInit, OnDestroy {

  public pageUrl: string;
  public qrCode: string = '';
  public scanActive: boolean = false;
  public scanFound: boolean = false;

  @ViewChild('video', {static: false }) video: ElementRef;
  @ViewChild('canvas', {static: false }) canvas: ElementRef;
  public videoElement: any;
  public canvasElement: any;
  public canvasContext: any;

  constructor( private platform: Platform, private router: Router, private ref: ChangeDetectorRef ) {
    const isInStandAloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandAloneMode()) { console.log('I am a PWA iOS !'); }
  }
  
  public ngOnInit() {
    console.log('ngOnInit().url: ', this.router.url);
    this.pageUrl = this.router.url || QRSCAN_PAGE;
  }
  
  public ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext  = this.canvasElement.getContext('2d');
  }

  public ngOnDestroy() {
    console.log('ngOnDestroy() --> release Vdeo stream');
    this.releaseVideo()
  }
  
  public async startScan() {
    console.log('startScan()');
    // debugger;
    
    // reset Scan
    this.resetScan();
    // start video stream
    if ( ! this.videoElement.srcObject) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }});
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute('playsinline', true);
    }
    this.videoElement.play();
    // refresh page
    // this.ref.markForCheck();
    // start scanning process
    requestAnimationFrame(this.scan.bind(this));
    this.scanActive = true;
  }
  
  public async scan() {
    // check that active page is still this one and stop, release video if not the case
    if ( this.router.url !== this.pageUrl) {
      console.log(`url has moved to ${this.router.url}, stopping worthless scan! --> should clear video stream onDestroy`);
      this.stopScan();
    }
    
    if (this.scanActive) {
      if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
        // capture image from video stream
        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.height, this.canvasElement.width);
        const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.height, this.canvasElement.width);
        // console.log('scan() - process Image scanning');
        // scan captured image
        const scanResult = jsQR( imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert'} );
          
        if (! scanResult) {
          // console.log('scan() - no result yet');
          // restart image capture
          requestAnimationFrame(this.scan.bind(this));
        } else {
          // console.log('scan() --> QR code found!');
          this.stopScan();
          this.getScanResult(scanResult.data);
        }
      } else {
        // console.log('scan() - video stream not ready yet');
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  public stopScan() {
    if (this.scanActive) {
      console.log('stopScan()');
      this.scanActive = false;
      this.videoElement.pause();
      // refresh page
      // this.ref.markForCheck();
    }
  }

  public resetScan() {
    console.log('resetScan()');
    this.scanFound = false;
    // refresh page
    // this.ref.markForCheck();
  }
  

  public releaseVideo() {
    console.log('releaseVideo()');
    if (this.scanActive) { this.videoElement.pause(); }
    delete this.videoElement.srcObject      // The call mentioned in other answers
    this.videoElement.removeAttribute('srcObject'); // empty source
    this.videoElement.load(); // empty buffer
    this.videoElement.remove()    // Removing the video element altogether
  }

  public getScanResult(qrCode: string) {
    console.log(`getScanResult(${qrCode})`);
    this.scanFound = true;
    this.qrCode = qrCode
  }
}
