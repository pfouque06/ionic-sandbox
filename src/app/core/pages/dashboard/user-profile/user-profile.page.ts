import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input() userId: number = null;
  
  constructor(private route: ActivatedRoute) { console.log('dashboard/profile'); }

  ngOnInit() {
    if (!this.userId) {
      // retrieve user if id provided in incoming route
      this.userId = this.route.snapshot.params?.id;
    }
  }
}
