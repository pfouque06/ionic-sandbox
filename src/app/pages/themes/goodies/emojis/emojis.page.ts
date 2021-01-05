import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.page.html',
  styleUrls: ['./emojis.page.scss'],
})
export class EmojisPage implements OnInit {

  constructor() { console.log('themes/goodies/emojis'); }

  ngOnInit() {
  }

}
