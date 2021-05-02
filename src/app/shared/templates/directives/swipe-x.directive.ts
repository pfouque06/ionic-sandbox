import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

const SWIPE_DRAG_THRESHOLD = 0;
const SWIPE_EMIT_THRESHOLD = 100;
@Directive({
  selector: '[swipeX]'
})
export class SwipeXDirective  implements OnInit {

  // @Input() swipeDragThreshold = SWIPE_DRAG_THRESHOLD;
  @Input() swipeDragThreshold: number = SWIPE_DRAG_THRESHOLD;
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
      if (this.swipeDragThreshold !== 0) { deltaX = Math.min(Math.max(deltaX, -this.swipeDragThreshold), this.swipeDragThreshold); }
      this.el.nativeElement.style.transform = `translateX(${deltaX}px)`;
    }

    private handleSwipeEmit(ev) {
      // console.log('swipeGesture onEnd');
      this.el.nativeElement.style.transform = `translateX(0px)`;
      const deltaX = ev.deltaX;
      if (Math.abs(deltaX) > this.swipeEmitThreshold) { this.swipeX.emit(deltaX); }
    }
}
