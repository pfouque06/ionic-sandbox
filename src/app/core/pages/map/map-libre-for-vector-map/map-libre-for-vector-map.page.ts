import { Component, OnInit } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-map-libre-for-vector-map',
  templateUrl: './map-libre-for-vector-map.page.html',
  styleUrls: ['./map-libre-for-vector-map.page.scss'],
})
export class MapLibreForVectorMapPage implements OnInit {

  private map: Map;

    // Location coordinates : default : Nice / Colline du château / point de vue
  public latitude: any = '43.695939';
  public longitude: any = '7.279748';
  public zoom = 12;

  constructor() { console.log('map/mapLibre'); }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.mapLibreSetup();
  }

  private mapLibreSetup() {
    this.map = new Map({
      container: 'mapLibre', // container id
      style:
      'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      center: [this.longitude, this.latitude], // starting position [lng, lat]
      zoom: this.zoom // starting zoom
      });
  }
}
