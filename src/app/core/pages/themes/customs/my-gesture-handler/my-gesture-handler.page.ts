import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

type positionType = { x: number, y: number};
const styleToggle = `background: var(--ion-color-light)`;
const styleNeutral = `background:`;

@Component({
  selector: 'app-my-gesture-handler',
  templateUrl: './my-gesture-handler.page.html',
  styleUrls: ['./my-gesture-handler.page.scss'],
})
export class MyGestureHandlerPage implements OnInit {

  // double Tap
  @ViewChild('doubleTapBox', { read: ElementRef }) private doubleTapBox: ElementRef;
  public doubleTapStatus = false;

  // Long Press
  @ViewChild('longPressBox', { read: ElementRef }) private longPressBox: ElementRef;
  public longPressStatus = false;
  public power = 0;

  // Swipe Gesture
  @ViewChild('swipeBox', { read: ElementRef }) private swipeBox: ElementRef;
  public swipeStatus = false;

  // multi Gestures
  @ViewChild('multiBox', { read: ElementRef }) private multiBox: ElementRef;
  public multiBoxStatus = false;
  public MultiBoxPower = undefined;

  // swipe & double Tap Gestures
  @ViewChild('swipeTapBox', { read: ElementRef }) private swipeTapBox: ElementRef;
  public swipeTapBoxStatus = false;

  constructor() { }

  ngOnInit() { }

  public onDoubleTap() {
    // console.log('--> onDoubleTap()');
    this.doubleTapStatus = true;
    this.doubleTapBox.nativeElement.style = styleToggle;

    timer(400).subscribe( () => {
      this.doubleTapStatus = false;
      this.doubleTapBox.nativeElement.style = styleNeutral;
    } );
  }

  public onLongPress(power: number) {
    // console.log('--> onLongPress()', power);
    this.power = power;
    this.longPressStatus = true;
    this.longPressBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.longPressStatus = false;
      this.longPressBox.nativeElement.style = styleNeutral;
    } );
  }

  public onSwipeX(deltaX: number) {
    // console.log('--> onSwipeX()', deltaX);
    this.swipeStatus = true;
    this.swipeBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.swipeStatus = false;
      this.swipeBox.nativeElement.style = styleNeutral;
    });
  }

  public multiBoxOnDoubleTap() {
    // console.log('--> multiBoxOnDoubleTap()');
    this.multiBoxToggleStatus();
  }
  public multiBoxOnLongPress(power: number) {
    // console.log('--> multiBoxOnLongPress()', power);
    this.MultiBoxPower = power;
    this.multiBoxToggleStatus();
  }
  private multiBoxToggleStatus() {
    this.multiBoxStatus = true;
    this.multiBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.multiBoxStatus = false;
      this.MultiBoxPower = undefined;
      this.multiBox.nativeElement.style = styleNeutral;
    });
  }

  public swipeTapBoxOnDoubleTap() {
    // console.log('--> swipeTapBoxOnDoubleTap()');
    this.swipeTapBoxToggleStatus();
  }
  public swipeTapBoxOnSwipeX(deltaX: number) {
    // console.log('--> swipeTapBoxOnSwipeX()', deltaX);
    this.swipeTapBoxToggleStatus();
  }
  private swipeTapBoxToggleStatus() {
    this.swipeTapBoxStatus = true;
    this.swipeTapBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.swipeTapBoxStatus = false;
      this.swipeTapBox.nativeElement.style = styleNeutral;
    });
  }
}
