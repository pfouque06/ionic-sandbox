import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[longPress]'
})
export class LongPressDirective implements OnInit {

  private longPressInterval = 251;
  private longPressStartTimestamp = 0;
  private longPressActive = false;
  private power = 0;

  @Output() longPress = new EventEmitter<number>();

  constructor(private gestureCtrl: GestureController, private el: ElementRef) { }

  ngOnInit() { this.setupLongPressGestures(); }

  // Long press gesture setup
  private setupLongPressGestures() {
    const longPressGesture = this.gestureCtrl.create({
      gestureName: 'longPress',
      el: this.el.nativeElement,
      threshold: 0,
      onStart: ev => {
        // console.log('longPressGesture onStart');
        this.longPressStartTimestamp = Math.floor(ev.event.timeStamp);
        this.longPressActive = true;
        this.power = 0;
        this.increasePower();
      },
      onEnd: ev => {
        // console.log('longPressGesture onEnd');
        this.longPressActive = false;
        const pressEndTimestamp = Math.floor(ev.event.timeStamp);
        const isLongPress = (this.longPressStartTimestamp + this.longPressInterval ) < pressEndTimestamp;
        if (isLongPress) { this.longPress.emit(this.power); }
      }
    }, true); // Run the gesture callback inside of NgZone!
    longPressGesture.enable(true);
  }

  private increasePower(timeout = 100) {
    setTimeout(() => {
      if (this.longPressActive) {
        this.power++;
        this.increasePower(timeout / 1.5);
      }
    }, timeout);
  }
}
