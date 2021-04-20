import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTab, MatTabChangeEvent } from '@angular/material/tabs';
import { Platform } from '@ionic/angular';
import jsQR from 'jsqr';

export const QRCODE_SCAN_PAGE = '/tabs/themes/qrcode-menu';

@Component({
  selector: 'app-qrcode-menu',
  templateUrl: './qrcode-menu.page.html',
  styleUrls: ['./qrcode-menu.page.scss'],
})
export class QRCodeMenuPage implements OnInit, AfterViewInit, OnDestroy {

  // tab Index
  public providedMatTabLabel: string;
  public MatTabIndex: number;
  @ViewChildren(MatTab) matTabs: QueryList<MatTab>;

  // Generator
  public QRCodeInput: string;

  // Scanner
  public pageUrl: string;
  public QRCode: string;
  public scanActive = false;
  public scanFound = false;

  @ViewChild('video', {static: false }) video: ElementRef;
  @ViewChild('canvas', {static: false }) canvas: ElementRef;
  public videoElement: any;
  public canvasElement: any;
  public canvasContext: any;

  constructor(private route: ActivatedRoute, private platform: Platform, private router: Router, private ref: ChangeDetectorRef ) {
    this.providedMatTabLabel = this.route.snapshot.params?.tab;
    console.log(`themes/goodies/qrcode${this.providedMatTabLabel ? `/${this.providedMatTabLabel}` : ''}`);
    const isInStandAloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];
    if (this.platform.is('ios') && isInStandAloneMode()) { console.log('I am a PWA iOS !'); }
  }

  public ngOnInit() {
    this.pageUrl = this.router.url || QRCODE_SCAN_PAGE;
  }

  public ngAfterViewInit() {
    // Scanner
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext  = this.canvasElement.getContext('2d');
    // Tab selector
    this.MatTabIndex = this.matTabs.find((matTab) => this.providedMatTabLabel === matTab.textLabel)?.position;
  }

  public ngOnDestroy() {
    this.stopScan();
  }

  public async startScan() {
    // console.log('--> startScan()');
    // reset Scan
    this.resetScan();

    // start video stream
    if ( ! this.videoElement?.srcObject) {
      // console.log('fetching new video stream from Navigator');
      this.videoElement = this.video.nativeElement;
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
    console.log('--> QRCode scan started');
  }

  public async scan() {
    // check that active page is still this one and stop, release video back media streams to navigator if not the case
    if ( this.router.url !== this.pageUrl) {
      // console.log(`scan() -> page url has moved out to ${this.router.url}!`);
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
          this.pauseVideo();
          this.getScanResult(scanResult.data);
        }
      } else {
        // console.log('scan() - video stream not ready yet');
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  public resetScan() {
    // console.log('--> reset Scanner');
    this.scanFound = false;
    this.videoElement = null;
    // refresh page
    // this.ref.markForCheck();
  }

  public stopScan() {
    if (this.scanActive) {
      // console.log('stopScan()');
      this.pauseVideo();
      this.releaseVideo();
      console.log('--> QRCode scan stopped');
      // refresh page
      // this.ref.markForCheck();
    }
  }

  public pauseVideo() {
    // console.log('--> pause Video');
    this.scanActive = false;
    this.videoElement.pause();
  }

  public releaseVideo() {
    if ( this.videoElement.srcObject ) {
      // console.log('--> release Video');
      // stop stream's tracks
      this.videoElement.srcObject.getTracks().forEach( (track) => track.stop() );
      // release media stream to navigator
      // delete this.videoElement.srcObject
      this.videoElement.srcObject = null;
    }
  }

  public getScanResult(qrCode: string) {
    // console.log(`getScanResult(${qrCode})`);
    this.scanFound = true;
    this.QRCode = qrCode;
    console.log(`--> found: ${this.QRCode}`);
  }

  public onTabChanged($event: MatTabChangeEvent) {
    const SelectedTabIndex = $event.index;
    const SelectedTabLabel = $event.tab.textLabel;
    // console.log(`onTabChanged(${SelectedTabIndex}, ${SelectedTabLabel})`);
    if ( SelectedTabLabel !== 'Scan' ) {
      if ( this.scanFound ) { this.pauseVideo();}
      else { this.stopScan(); }
    }
  }

}