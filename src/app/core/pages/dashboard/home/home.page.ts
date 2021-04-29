import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, SERVER_ADDRESS, SERVER_PROTOCOL } from 'koa-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swagger: string;

  constructor(
    @Inject(SERVER_ADDRESS) public readonly serverAddress: string,
    @Inject(SERVER_PROTOCOL) public readonly serverProtocol: 's' | '',
    private authService: AuthService) {
      console.log('dashboard/home');
      this.swagger = `http${this.serverProtocol}://${this.serverAddress}/swagger`;
    }

  public ping(): boolean {
    return this.authService.pong;
  }

  ngOnInit() {
  }

}
