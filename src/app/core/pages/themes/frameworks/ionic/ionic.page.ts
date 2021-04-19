import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/core';
import { IonReorderGroup } from '@ionic/angular';
import { UIToolingService } from 'src/app/shared/services/UITooling.service';

@Component({
  selector: 'app-ionic',
  templateUrl: './ionic.page.html',
  styleUrls: ['./ionic.page.scss'],
})
export class IonicPage implements OnInit {

  @Input() public topic: string;

  constructor(private route: ActivatedRoute, private UITooling: UIToolingService) {
    if ( ! this.topic) { this.topic = this.route.snapshot.params?.topic; }
    console.log(`themes/ionic/${this.topic}`);
  }

  public ngOnInit() { }
}
