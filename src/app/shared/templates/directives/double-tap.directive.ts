import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[doubleTap]'
})
export class DoubleTapDirective {

  private doubleTapInterval = 300;
  private lastTapTimestamp = 0;
  private tapCount = 0;

  @Output() doubleTap = new EventEmitter();

  constructor(private gestureCtrl: GestureController, private el: ElementRef) { }

  @HostListener('click', ['$event'])
  public handleTap(ev) {
    const tapTimestamp = Math.floor(ev.timeStamp);
    const isDoubleTap = (this.lastTapTimestamp + this.doubleTapInterval ) > tapTimestamp;
    this.tapCount++;
    this.lastTapTimestamp = tapTimestamp;
    if (isDoubleTap) { this.emitTap(); }
    else if ( this.tapCount > 1 ) {this.resetTaps(); }
  }

  private emitTap() {
    switch (this.tapCount) {
      // case 1, 3, ... : this.handleOtherTap(); break;
      case 2 : {
        this.doubleTap.emit();
        break;
      }
    }
    this.resetTaps();
  }

  private resetTaps() {
    this.tapCount = 0;
    this.lastTapTimestamp = 0;
  }
}
