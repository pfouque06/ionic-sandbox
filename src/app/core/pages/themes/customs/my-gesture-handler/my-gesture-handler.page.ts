import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

type positionType = { x: number, y: number};
const styleToggle = `background: var(--ion-color-light)`;
const styleNeutral = `background:`;

export type randomUserType = {
  gender: string,
  name: {
    first: string,
    last: string,
    title: string
  }
  nat: string,
  email: string,
  picture: {
    large: string,
    media: string,
    thumbnail: string,
  }
};
export type randomUserTypeResult = {
  results: randomUserType[],
  info: any
};

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

  // multi Gestures
  @ViewChild('multiBox', { read: ElementRef }) private multiBox: ElementRef;
  public multiBoxStatus = false;
  public MultiBoxPower = undefined;

  // Swipe Gesture
  @ViewChild('swipeBox', { read: ElementRef }) private swipeBox: ElementRef;
  public swipeStatus = false;

  // Swipe Alt Gesture
  @ViewChild('swipeAltBox', { read: ElementRef }) private swipeAltBox: ElementRef;
  public swipeAltStatus = false;

  // swipe & double Tap Gestures
  @ViewChild('swipeTapBox', { read: ElementRef }) private swipeTapBox: ElementRef;
  public swipeTapBoxStatus = false;

  // item box
  @ViewChild('itemBox', { read: ElementRef }) private itemBox: ElementRef;
  public user: randomUserType;

  constructor(private http: HttpClient) {
    this.getRandomUser();
  }

  ngOnInit() { }

  private getRandomUser() {
    this.fetchRandomUsers(1).subscribe({
      next: (results) => [this.user] = results,
      error: _ => console.log('https://randomuser.me/api fetch error')
    });
  }

  private fetchRandomUsers(size: number) {
    return this.http.get<randomUserTypeResult>(
      `https://randomuser.me/api/?inc=gender,name,nat,email,picture&results=${size}`, { responseType: 'json'})
      .pipe(map((r) => r.results));
  }

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

  // swipe box
  public onSwipeX(deltaX: number) {
    // console.log('--> onSwipeX()', deltaX);
    this.swipeStatus = true;
    this.swipeBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.swipeStatus = false;
      this.swipeBox.nativeElement.style = styleNeutral;
    });
  }

  // swipe Alt box
  public onSwipeAltX(deltaX: number) {
    // console.log('--> onSwipeX()', deltaX);
    this.swipeAltStatus = true;
    this.swipeAltBox.nativeElement.style = styleToggle;
    timer(400).subscribe( () => {
      this.swipeAltStatus = false;
      this.swipeAltBox.nativeElement.style = styleNeutral;
    });
  }

  // multi box
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

  // Swipe Tap box
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

  // item box
  public onSliderX(deltaX: number) {
    console.log('onSliderX()', deltaX);
    if (deltaX < 0) { this.user = null; }
    else { this.getRandomUser(); }
  }
}
