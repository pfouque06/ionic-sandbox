import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.page.html',
  styleUrls: ['./spinners.page.scss'],
})
export class SpinnersPage implements OnInit {

  public hidden: boolean = true;

  public skeletons: any = [
    {
      img: "thebeatles.jpeg",
      label: "Abbey Road",
      author: "The Beatles",
      year: "1969"
    },
    {
      img: "pinkfloyd.jpeg",
      label: "The Dark Side of the Moon",
      author: "Pink Floyd",
      year: "1973"
    },

  ]

  constructor() { console.log('themes/goodies/spinners'); }

  ngOnInit() {
  }

}
