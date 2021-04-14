import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, SERVER_ADDRESS, SERVER_PROTOCOL } from 'koa-services';

@Component({
  selector: 'app-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage {

  public swagger: string;

  constructor(
    @Inject(SERVER_ADDRESS) public readonly serverAddress: string,
    @Inject(SERVER_PROTOCOL) public readonly serverProtocol: 's' | '',
    private authService: AuthService) { 
    console.log('home/features');
    this.swagger = `http${this.serverProtocol}://${this.serverAddress}/swagger`;
  }

  public ping(): boolean {
    return this.authService.pong;
  }
}
