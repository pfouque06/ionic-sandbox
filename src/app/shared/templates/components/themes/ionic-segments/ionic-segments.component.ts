import { Component, OnInit } from '@angular/core';
import { UIToolingService } from 'src/app/shared/services/UITooling.service';

@Component({
  selector: 'app-ionic-segments',
  templateUrl: './ionic-segments.component.html',
  styleUrls: ['./ionic-segments.component.scss'],
})
export class IonicSegmentsComponent implements OnInit {

  constructor(private UITooling: UIToolingService) { }

  ngOnInit() {}

  // Segment
  public onSegmentChanged(ev: any) {
    const message = `Segment changed: ${ev.detail.value}`;
    this.UITooling.fireAlert(message, 'info');
    // console.log(message);
  }
}
