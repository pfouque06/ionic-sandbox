import { Component, OnInit } from '@angular/core';
import { AuthService } from 'koa-services';

@Component({
  selector: 'app-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage {

  constructor(private authService: AuthService) { console.log('home/features'); }

  public ping(): boolean {
    return this.authService.pong;
  }
}
