import { Component, OnInit } from '@angular/core';
import { UIToolingService } from './../../../../services/UITooling.service';

@Component({
  selector: 'app-ionic-fabs',
  templateUrl: './ionic-fabs.component.html',
  styleUrls: ['./ionic-fabs.component.scss'],
})
export class IonicFabsComponent implements OnInit {

  constructor(private UITooling: UIToolingService) { }

  ngOnInit() {}

  // FAB
  public addToggle() {
    const message = `Edged FAB toggled !`;
    this.UITooling.fireAlert(message, 'info');
  }
}
