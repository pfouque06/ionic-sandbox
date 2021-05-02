import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Control, Marker, LayerGroup, Icon, tileLayer, layerGroup, map, Map, control } from 'leaflet';

@Component({
  selector: 'app-leaflet-for-raster-map',
  templateUrl: './leaflet-for-raster-map.page.html',
  styleUrls: ['./leaflet-for-raster-map.page.scss'],
})
export class LeafletForRasterMapPage implements OnInit, AfterViewInit, OnDestroy {

  // Leaflet Map
  private map: Map;
  private layerController: Control.Layers;
  private marker: Marker;
  private layerPickups: LayerGroup;
  private layerRecyclers: LayerGroup;
  private markerGeoLoc: Icon;
  private markerPickup: Icon;
  private markerRecycler: Icon;
  // private awesomeMarkerGeoLoc: Leaflet.AwesomeMarkers.Icon;
  // private awesomeMarkerPickup: Leaflet.AwesomeMarkers.Icon;
  // private awesomeMarkerRecycler: Leaflet.AwesomeMarkers.Icon;

  // Location coordinates : default : Nice / Colline du château / point de vue
  // marker: any;
  public latitude: any = '43.695939';
  public longitude: any = '7.279748';
  public zoom = 12;
  private accuracy: number;
  private timestamp: any = 'none';

  constructor() { console.log('map/leaflet'); }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ionViewDidEnter() {
    this.leafletSetup();
  }

  ngOnDestroy() {
  }

  leafletSetup() {
    // if (this.map?.hasLayer) { return; }

    // map previews : https://leaflet-extras.github.io/leaflet-providers/preview/
    // const EsriSat = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    // const cdnBase = tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: 'moi@2021' });
    const osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'moi@2021' });
    const stadia = tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', { maxZoom: 20, attribution: 'moi@2021' });
    const cdnVoyager = tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', { attribution: 'moi@2021' });
    const geoPortailFrance = tileLayer('https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
      attribution: 'moi@2021',
      bounds: [[-75, -180], [81, 180]],
      minZoom: 2,
      maxZoom: 19,
      // apikey: 'choisirgeoportail',
      // format: 'image/jpeg',
      // style: 'normal'
    });
    // base Maps
    const baseMaps = {
      // 'ESRI Satellite': EsriSat,
      // 'cartoCDN Base': cdnBase,
      OpenStreetMap: osm,
      stadia,
      'cartoCDN Voyager': cdnVoyager,
      'GeoPortailFrance Satellite': geoPortailFrance,
    };

    // Marker iconing : geolocation, recycler and pickup points
    // this.awesomeMarkerGeoLoc = new Leaflet.Icon({
    //   iconUrl: 'assets/marker/marker-base-icon.png',
    //   shadowUrl: 'assets/marker/marker-shadow.png',
    //   iconSize: [ 25, 40 ],
    //   iconAnchor: [ 13, 40 ],
    // });
    // this.markerPickup = new Leaflet.Icon({
    //   iconUrl: 'assets/marker/marker-green-icon.png',
    //   shadowUrl: 'assets/marker/marker-shadow.png',
    //   iconSize: [ 25, 40 ],
    //   iconAnchor: [ 13, 40 ],
    // });
    // this.markerRecycler = new Leaflet.Icon({
    //   iconUrl: 'assets/marker/marker-yellow-icon.png',
    //   shadowUrl: 'assets/marker/marker-shadow.png',
    //   iconSize: [ 25, 40 ],
    //   iconAnchor: [ 13, 40 ],
    // });

    // ExtraMarker iconing: geolocatoin, recycler and pickup points
    // Leaflet.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
    // this.awesomeMarkerGeoLoc = new (Leaflet as any).AwesomeMarkers.icon({
    // this.awesomeMarkerGeoLoc = new Leaflet.AwesomeMarkers.Icon({
    //   icon: 'home',
    //   markerColor: 'blue',
    //   iconColor: 'white',
    // })
    // this.awesomeMarkerPickup = new Leaflet.AwesomeMarkers.Icon({
    //   icon: 'recycle',
    //   markerColor: 'green',
    //   iconColor: 'white',
    // })
    // this.awesomeMarkerRecycler = new Leaflet.AwesomeMarkers.Icon({
    //   icon: 'dumpster',
    //   markerColor: 'orange', //'red', 'orange', 'purple',
    //   iconColor: 'white',
    // })

    this.layerPickups = layerGroup(),
    this.layerRecyclers = layerGroup();
    // var overlayMaps = {
    //     "Pickups": this.layerPickups,
    //     "Recyclers": this.layerRecyclers,
    // };
    // Leaflet.control.layers(baseMaps, overlayMaps).addTo(this.map);

    this.map = map('leaflet', {
      center: [this.latitude, this.longitude],
      zoom: this.zoom,
      layers: [ geoPortailFrance, cdnVoyager, osm, stadia, /* cdnBase, EsriSat  */],
      zoomControl: false,
      attributionControl: false,
      // renderer: canvas(),
    });
    this.layerController = control.layers(baseMaps, {}, {position: 'topleft'}).addTo(this.map);
  }
}

