import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { GestureController, DomController } from '@ionic/angular';
import { timer } from 'rxjs';

type positionType = { x: number, y: number};
const styleBackLight = `background: var(--ion-color-light)`;
const styleBackNeutral = `background:`;

@Component({
  selector: 'app-ionic-gestures',
  templateUrl: './ionic-gestures.component.html',
  styleUrls: ['./ionic-gestures.component.scss'],
})
export class IonicGesturesComponent implements OnInit, AfterViewInit {

  // Double Tap
  @ViewChild('doubleTapBox', { read: ElementRef }) private doubleTapBox: ElementRef;
  private doubleTapInterval = 300;
  private lastTapTimestamp = 0;
  private tapCount = 0;
  public doubleTapStatus = false;

  // Long Press
  @ViewChild('longPressBox', { read: ElementRef }) private longPressBox: ElementRef;
  private longPressInterval = 251;
  private longPressStartTimestamp = 0;
  private longPressActive = false;
  public longPressStatus = false;
  public power = 0;

  // Drag Gesture
  @ViewChild('box', { read: ElementRef }) private box: ElementRef;
  @ViewChild('dragBox', { read: ElementRef }) private dragBox: ElementRef;
  private startPosition: positionType;
  public currentPosition: positionType = {x: 0, y: 0};

  // Swipe Gesture
  @ViewChild('SwipeBox', { read: ElementRef }) private SwipeBox: ElementRef;
  public swipeStatus = false;

  constructor(private gestureCtrl: GestureController, private domCtrl: DomController, private zoneCtrl: NgZone, ) { }

  ngOnInit() {}

  async ngAfterViewInit() {
    // Use DomCtrl to get the correct header height
    // await this.domCtrl.read(() => {
    // console.log(this.dragBox.nativeElement.offsetHeight);
    // console.log(this.dragBox.nativeElement.offsetWidth);
    // console.log(this.dragBox.nativeElement.clientHeight);
    // console.log(this.dragBox.nativeElement.clientWidth);
    // console.log(this.dragBox.nativeElement.getBoundingClientRect());
    // console.log(this.dragBox.nativeElement.getClientRects());
    // console.log(this.box.nativeElement.getBoundingClientRect());
    // console.log(this.box.nativeElement.getClientRects());
    // });
    this.setupLongPressGestures();
    this.setupDragGestures();
    this.setSwipeGesture();
  }

  // tap manager
  // @HostListener('click', ['$event']) --> not used since it covers full DOM
  public handleTap(ev) {
    const tapTimestamp = Math.floor(ev.timeStamp);
    const isDoubleTap = (this.lastTapTimestamp + this.doubleTapInterval ) > tapTimestamp;
    this.tapCount++;
    this.lastTapTimestamp = tapTimestamp;
    if (isDoubleTap) { this.emitTap(); }
    else if ( this.tapCount > 1 ) {this.resetTaps(); }
  }

  // emit tap action
  private emitTap() {
    switch (this.tapCount) {
      // case 1, 3, ... : this.handleOtherTap(); break;
      case 2 : {
        this.handleDoubleTap();
        break;
      }
    }
    this.resetTaps();
  }

  private handleDoubleTap() {
    this.doubleTapStatus = true;
    this.doubleTapBox.nativeElement.style = styleBackLight;
    timer(400).subscribe( () => {
      this.doubleTapStatus = false;
      this.doubleTapBox.nativeElement.style = styleBackNeutral;
    } );
  }

  private resetTaps() {
    this.tapCount = 0;
    this.lastTapTimestamp = 0;
    this.doubleTapStatus = false;
  }

  // Long press gesture setup
  private setupLongPressGestures() {
    const longPressGesture = this.gestureCtrl.create({
      gestureName: 'longPress',
      el: this.longPressBox.nativeElement,
      threshold: 0,
      onStart: ev => {
        this.longPressStartTimestamp = Math.floor(ev.event.timeStamp);
        this.longPressActive = true;
        this.longPressStatus = false;
        this.power = 0;
        this.increasePower();
      },
      onEnd: ev => {
        this.longPressActive = false;
        const pressEndTimestamp = Math.floor(ev.event.timeStamp);
        const isLongPress = (this.longPressStartTimestamp + this.longPressInterval ) < pressEndTimestamp;
        if (isLongPress) { this.handleLongPress(); }
      }
    }, true); // Run the gesture callback inside of NgZone!
    longPressGesture.enable(true);
  }

  private increasePower(timeout = 200) {
    setTimeout(() => {
      if (this.longPressActive) {
          this.power++;
          this.increasePower(timeout / 1.5);
      }
    }, timeout);
  }

  private handleLongPress() {
    this.longPressStatus = true;
    this.longPressBox.nativeElement.style = styleBackLight;
    timer(400).subscribe( () => {
      this.longPressStatus = false;
      this.longPressBox.nativeElement.style = styleBackNeutral;
    } );
  }

  // drag gesture setup
  private setupDragGestures() {
    const dragGesture = this.gestureCtrl.create({
      gestureName: 'drag',
      el: this.box.nativeElement,
      threshold: 0,
      onStart: ev => {
        this.startPosition = { ...this.currentPosition};
      },
      onMove: ev => { // this.zoneCtrl.run(() => { }); --> not needed
        this.dragBoxOnPosition({ x: this.startPosition.x + ev.deltaX, y: this.startPosition.y + ev.deltaY});
      },
      onEnd: ev => { // this.zoneCtrl.run(() => { }); --> not needed
        this.dragBoxOnPosition({ x: this.startPosition.x + ev.deltaX, y: this.startPosition.y + ev.deltaY});
      }
    }, true); // Run the gesture callback inside of NgZone!
    dragGesture.enable(true);
  }

  private dragBoxOnPosition(position: positionType) {
    this.currentPosition = { ... position};
    this.box.nativeElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }

  public resetBoxPosition() {
    this.dragBoxOnPosition( {x: 0, y: 0});
  }

  // Swipe Gesture setup
  private setSwipeGesture() {
    const swipeGesture = this.gestureCtrl.create({
      gestureName: 'swipe',
      el: this.SwipeBox.nativeElement,
      threshold: 15,
      direction: 'x',
      onStart: ev => { },
      onMove: ev => { this.handleSwipeGesture(ev); },
      onEnd: ev => { this.handleSwipeNavigate(ev); }
    }, true); // Run the gesture callback inside of NgZone!
    swipeGesture.enable(true);
  }

  private handleSwipeGesture(ev) {
    let delta = ev.deltaX;
    delta = Math.min(Math.max(delta, -30), 30);
    this.SwipeBox.nativeElement.style.transform = `translateX(${delta}px)`;
  }

  private handleSwipeNavigate(ev) {
    this.SwipeBox.nativeElement.style.transform = `translateX(0px)`;
    const delta = ev.deltaX;
    if (delta > 100 || delta < -100) {
      this.swipeStatus = true;
      this.SwipeBox.nativeElement.style = styleBackLight;
      timer(400).subscribe( () => {
        this.swipeStatus = false;
        this.SwipeBox.nativeElement.style = styleBackNeutral;
      } );
    }
  }
}
