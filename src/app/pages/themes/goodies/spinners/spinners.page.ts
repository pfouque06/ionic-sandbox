import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.page.html',
  styleUrls: ['./spinners.page.scss'],
})
export class SpinnersPage implements OnInit {

  public hidden: boolean = true;

  constructor() { console.log('themes/goodies/spinners'); }

  ngOnInit() {
  }

}
