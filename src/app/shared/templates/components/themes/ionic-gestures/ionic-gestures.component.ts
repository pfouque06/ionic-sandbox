import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { GestureController, DomController } from '@ionic/angular';

@Component({
  selector: 'app-ionic-gestures',
  templateUrl: './ionic-gestures.component.html',
  styleUrls: ['./ionic-gestures.component.scss'],
})
export class IonicGesturesComponent implements OnInit, AfterViewInit {

  @ViewChild('doubleTapBox', { read: ElementRef }) private doubleTapBox: ElementRef;
  @ViewChild('longPressBox', { read: ElementRef }) private longPressBox: ElementRef;
  @ViewChild('box', { read: ElementRef }) private box: ElementRef;
  @ViewChild('dragBox', { read: ElementRef }) private dragBox: ElementRef;
  public power = 0;
  public longPressActive = false;

  public deltaX = 0;
  public deltaY = 0;

  constructor(private gestureCtrl: GestureController, private domCtrl: DomController, private zoneCtrl: NgZone, ) { }

  ngOnInit() {}

  async ngAfterViewInit() {
    // Use DomCtrl to get the correct header height
    // await this.domCtrl.read(() => {
    // });
    const dragBoxHeight = this.dragBox.nativeElement.offsetHeight;
    const dragBoxWidth = this.dragBox.nativeElement.offsetWidth;
    const dragBoxInnerHeight = this.dragBox.nativeElement.clientHeight;
    const dragBoxInnerWidth = this.dragBox.nativeElement.clientWidth;
    console.log(this.dragBox.nativeElement.offsetHeight);
    console.log(this.dragBox.nativeElement.offsetWidth);
    console.log(this.dragBox.nativeElement.clientHeight);
    console.log(this.dragBox.nativeElement.clientWidth);
    console.log(this.dragBox.nativeElement.getBoundingClientRect());
    console.log(this.dragBox.nativeElement.getClientRects());
    console.log(this.box.nativeElement.getBoundingClientRect());
    console.log(this.box.nativeElement.getClientRects());
    const boxPosition = this.box.nativeElement.getBoundingClientRect();
    this.setupGesture();
  }

  // setupGesture(offsetHeight, offsetWidth, clientHeight, clientWidth) {
  setupGesture() {
    const doubleTabGesture = this.gestureCtrl.create({
      gestureName: 'doubleTab',
      el: this.doubleTapBox.nativeElement,
      threshold: 0,
      onStart: ev => {
        console.log('doubleTabGesture start!', ev);
      },
      onEnd: ev => {
        console.log('doubleTabGesture end!', ev);
      }
    }, true); // Run the gesture callback inside of NgZone!
    doubleTabGesture.enable(true);

    const longPressGesture = this.gestureCtrl.create({
      gestureName: 'longPress',
      el: this.longPressBox.nativeElement,
      threshold: 0,
      onStart: ev => {
        this.longPressActive = true;
        this.power = 0;
        this.increasePower();
      },
      onEnd: ev => {
        this.longPressActive = false;
      }
    }, true); // Run the gesture callback inside of NgZone!
    longPressGesture.enable(true);

    const dragGesture = this.gestureCtrl.create({
      gestureName: 'drag',
      el: this.box.nativeElement,
      threshold: 0,
      onStart: ev => {
        // console.log('dragGesture start!', this.deltaX, this.deltaY);
      },
      onMove: ev => {
        // this.zoneCtrl.run(() => { });
        const deltaX = this.deltaX + ev.deltaX;
        const deltaY = this.deltaY + ev.deltaY;
        this.box.nativeElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        // console.log('dragGesture move!', deltaX, deltaY);
      },
      onEnd: ev => {
        // this.zoneCtrl.run(() => { });
        this.deltaX += ev.deltaX;
        this.deltaY += ev.deltaY;
        this.box.nativeElement.style.transform = `translate(${this.deltaX}px, ${this.deltaY}px)`;
        // console.log('dragGesture end!', this.deltaX, this.deltaY);
      }
    }, true); // Run the gesture callback inside of NgZone!
    dragGesture.enable(true);
  }

  increasePower(timeout = 200) {
    setTimeout(() => {
      if (this.longPressActive) {
          // if (this.power >= 5) {
          //   this.longPressActive = false;
          //   return;
          // }
          this.power++;
          this.increasePower(timeout / 1.5);
      }
    }, timeout);
  }
}
