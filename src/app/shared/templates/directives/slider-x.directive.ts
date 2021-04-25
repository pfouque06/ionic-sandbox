import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

const SLIDE_THRESHOLD = 0;
const SLIDE_EMIT_THRESHOLD = 100;

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[sliderX]'
})
export class SliderXDirective  implements OnInit {

  // @Input() slideThreshold = slide_THRESHOLD;
  @Input() sliderThreshold: number = SLIDE_THRESHOLD;
  @Input() sliderEmitThreshold: number = SLIDE_EMIT_THRESHOLD;
  @Output() sliderX = new EventEmitter<number>();

  constructor(private gestureCtrl: GestureController, private el: ElementRef) { }

  ngOnInit() { this.setSlideGesture(); }

    // slide Gesture setup
    private setSlideGesture() {
      const slideGesture = this.gestureCtrl.create({
        gestureName: 'slider',
        el: this.el.nativeElement,
        threshold: 15,
        direction: 'x',
        onStart: ev => { },
        onMove: ev => { this.handleSliderGesture(ev); },
        onEnd: ev => { this.handleSliderEmit(ev); }
      }, true); // Run the gesture callback inside of NgZone!
      slideGesture.enable(true);
    }

    private handleSliderGesture(ev) {
      // console.log('slideGesture onMove');
      let deltaX = ev.deltaX;
      if (this.sliderThreshold !== 0) { deltaX = Math.min(Math.max(deltaX, -this.sliderThreshold), this.sliderThreshold); }
      // this.el.nativeElement.style.transform = `translateX(${deltaX}px)`;

      // this.domCtrl.write(() => {
      //   // Make sure the item is above the other elements
      //   itemElement.style.zIndex = 2;
      //   // Reposition the item
      //   itemElement.style.transform = `translateX(${currentX}px)`;
      // });

      // Make sure the item is above the other elements
      this.el.nativeElement.style.zIndex = 2;
      // Reposition the item
      this.el.nativeElement.style.transform = `translateX(${deltaX}px)`;
    }

    private handleSliderEmit(ev) {
      // console.log('slideGesture onEnd');
      this.el.nativeElement.style.transform = `translateX(0px)`;
      const deltaX = ev.deltaX;
      if (Math.abs(deltaX) > this.sliderEmitThreshold) { this.sliderX.emit(deltaX); }
    }
}

