import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-qrcode-scan',
  templateUrl: './qrcode-scan.page.html',
  styleUrls: ['./qrcode-scan.page.scss'],
})
export class QRcodeScanPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
