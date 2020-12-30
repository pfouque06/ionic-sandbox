import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {

  @Input() public title: string;
  @Input() public menuId: string;

  constructor() { }

  ngOnInit() {}
}
