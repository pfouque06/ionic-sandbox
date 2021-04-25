import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

const SWIPE_THRESHOLD = 50;
const SWIPE_EMIT_THRESHOLD = 150;
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[swipeX]'
})
export class SwipeXDirective  implements OnInit {

  // @Input() swipeThreshold = SWIPE_THRESHOLD;
  @Input() swipeThreshold: number = SWIPE_THRESHOLD;
  @Input() swipeEmitThreshold: number = SWIPE_EMIT_THRESHOLD;
  @Output() swipeX = new EventEmitter<number>();

  constructor(private gestureCtrl: GestureController, private el: ElementRef) { }

  ngOnInit() { this.setSwipeGesture(); }

    // Swipe Gesture setup
    private setSwipeGesture() {
      const swipeGesture = this.gestureCtrl.create({
        gestureName: 'swipe',
        el: this.el.nativeElement,
        threshold: 15,
        direction: 'x',
        onStart: ev => { },
        onMove: ev => { this.handleSwipeGesture(ev); },
        onEnd: ev => { this.handleSwipeEmit(ev); }
      }, true); // Run the gesture callback inside of NgZone!
      swipeGesture.enable(true);
    }

    private handleSwipeGesture(ev) {
      // console.log('swipeGesture onMove');
      let deltaX = ev.deltaX;
      if (this.swipeThreshold !== 0) { deltaX = Math.min(Math.max(deltaX, -this.swipeThreshold), this.swipeThreshold); }
      this.el.nativeElement.style.transform = `translateX(${deltaX}px)`;
    }

    private handleSwipeEmit(ev) {
      // console.log('swipeGesture onEnd');
      this.el.nativeElement.style.transform = `translateX(0px)`;
      const deltaX = ev.deltaX;
      if (Math.abs(deltaX) > this.swipeEmitThreshold) { this.swipeX.emit(deltaX); }
    }
}
