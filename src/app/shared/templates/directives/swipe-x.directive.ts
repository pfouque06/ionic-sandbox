import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[swipeX]'
})
export class SwipeXDirective  implements OnInit {


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
        onEnd: ev => { this.handleSwipeNavigate(ev); }
      }, true); // Run the gesture callback inside of NgZone!
      swipeGesture.enable(true);
    }

    private handleSwipeGesture(ev) {
      // console.log('swipeGesture onMove');
      const delta = Math.min(Math.max(ev.deltaX, -30), 30);
      this.el.nativeElement.style.transform = `translateX(${delta}px)`;
    }

    private handleSwipeNavigate(ev) {
      // console.log('swipeGesture onEnd');
      this.el.nativeElement.style.transform = `translateX(0px)`;
      const deltaX = ev.deltaX;
      if (Math.abs(deltaX) > 100) { this.swipeX.emit(deltaX); }
    }
}
