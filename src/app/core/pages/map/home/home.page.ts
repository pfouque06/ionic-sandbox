import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { canvas, Canvas, control, Control, Icon, layerGroup, LayerGroup, map, Map, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { console.log('map/home'); }

  ngOnInit() {
  }

}