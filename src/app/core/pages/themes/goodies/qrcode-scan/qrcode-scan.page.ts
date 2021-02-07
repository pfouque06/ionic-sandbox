import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import jsQR from 'jsqr';

export const QRSCAN_PAGE = '/tabs/themes/qrcode-scan';
@Component({
  selector: 'app-qrcode-scan',
  templateUrl: './qrcode-scan.page.html',
  styleUrls: ['./qrcode-scan.page.scss'],
})
export class QRcodeScanPage implements OnInit {

  public qrCode: string = '';
  public scanActive = false;
  public scanFound = false;
  public notFound = false;
  public timeout = false;
  public wrong = false;
  public failed = false;

  @ViewChild('video', {static: false }) video: ElementRef;
  @ViewChild('canvas', {static: false }) canvas: ElementRef;
  public videoElement: any;
  public canvasElement: any;
  public canvasContext: any;

  constructor(
    private platform: Platform, private ref: ChangeDetectorRef, private router: Router,
  ) {
    // TODO: throw this code to parent page :
    // - if Ios : disable scan button and enable photo capture image check https://morioh.com/p/454e2934c0ac#google_vignette at 21'
    const isInStandAloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandAloneMode()) {
      console.log('I am a PWA iOS !');
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext  = this.canvasElement.getContext('2d');

    this.startScan();
  }

  async startScan() {
    // reset Scan
    this.resetScan();
    // start video stream
    if ( ! this.videoElement.srcObject) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }});
      this.videoElement.srcObject = stream;
      this.videoElement.setAttribute('playsinline', true);
    }
    this.videoElement.play();
    this.scanActive = true;
    // refresh page
    this.ref.markForCheck();
    // start scanning process
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    // check that active page is still this one and stop, release video if not the case
    if ( this.router.url !== QRSCAN_PAGE) {
      this.stopScan();
    }

    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.scanActive) {
        // capture image from video stream
        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.height, this.canvasElement.width);
        const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.height, this.canvasElement.width);
        // scan captured image
        const scanResult = jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
          { inversionAttempts: 'dontInvert'}
          );

        if (! scanResult) {
          // restart image capture
          requestAnimationFrame(this.scan.bind(this));
        } else {
          this.stopScan();
          this.getScanResult(scanResult.data);
        }
      }
    } else {
      if (this.scanActive) {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  stopScan() {
    if (this.scanActive) {
      this.scanActive = false;
      this.videoElement.pause();
      // refresh page
      this.ref.markForCheck();
    }
  }

  resetScan() {
      this.scanFound = false;
      this.notFound = false;
      this.timeout = false;
      this.failed = false;
      this.wrong = false;
      // refresh page
      this.ref.markForCheck();
  }

  public getScanResult(qrCode: string) {
    this.qrCode = qrCode
  }
}
