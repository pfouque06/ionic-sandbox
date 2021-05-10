import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PickerController, PopoverController } from '@ionic/angular';
import { FullscreenControl, GeolocateControl, IControl, LngLatLike, Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { InspectControl, RulerControl } from 'mapbox-gl-controls';
// import { MapboxTraffic } from 'mapbox-gl-traffic';
import * as Geocoder from '@mapbox/mapbox-gl-geocoder';
import { MapStyleMenuPopoverComponent } from 'src/app/shared/templates/popover/map-style-menu-popover/map-style-menu-popover.component';

const MAPTYLERKEY = 'get_your_own_OpIi9ZULNHzrESv6T2vL';
const MAPBOXKEY = 'pk.eyJ1IjoicGZvdXF1ZSIsImEiOiJja29nOWVkN2YwbjIxMnVwMnNoNGowZWxmIn0.7-6PluWO1DpTocbzUvVAqQ';

@Component({
  selector: 'app-map-libre-for-vector-map',
  templateUrl: './map-libre-for-vector-map.page.html',
  styleUrls: ['./map-libre-for-vector-map.page.scss'],
})
export class MapLibreForVectorMapPage implements OnInit {

  // map attributes
  private map: Map;
  public style = 'streets';
  @ViewChild('info', { read: ElementRef }) infoRef: ElementRef;

  // Toggles
  public fullScreenToggle = true;
  public controlToggle = true;
  public rulerToggle = true;
  public geoLocationToggle = true;
  public styleSwitcherToggle = true;
  public geoCoderToggle = true;
  public inspectorToggle = true;
  public infoToggle = true;

  // Location coordinates and zoom, default : Nice
  public latitude: any = '43.70194';
  public longitude: any = '7.26833';
  public zoom = 11;

  // long press
  private longPressInterval = 251;
  private longPressStartTimestamp: number;
  private longPressActive  = false;

  // markers
  // private longPressMarker = new Marker({ color: 'var(--ion-color-medium', draggable: true });
  private longPressMarker = new Marker({ color: 'var(--ion-color-medium' });
  private geoCoderMarker = new Marker({ color: 'var(--ion-color-primary'});

  constructor(private popper: PopoverController, private pickerCtl: PickerController) { console.log('map/mapLibre'); }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.mapLibreSetup();
  }

  private mapLibreSetup() {
    this.map = new Map({
      container: 'mapLibre', // container id
      // style: 'mapbox://styles/mapbox/satellite-v9', // style URL
      // style: `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`, // style URL
      style: this.getStyle('streets'),
      attributionControl: false, // remove attribution / copyright
      center: [this.longitude, this.latitude], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      // maxPitch: 60 // starting pitch
    });

    // add basic controllers: fullscreen, zoom+pitch, ruler, geolocation
    this.map.addControl(new FullscreenControl(), 'top-left');
    this.map.addControl(new NavigationControl({ visualizePitch: true }), 'top-left');
    this.map.addControl(new RulerControl() as IControl, 'top-left');
    this.map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showAccuracyCircle: false,
        trackUserLocation: true,
        fitBoundsOptions: {
          maxZoom: 12,
        }
      }), 'top-left'
    );

    // add traffic from mapbox plugin
    // this.map.addControl(new MapboxTraffic(), 'top-left');

    // add style switch from mapbox plugin
    const styles: MapboxStyleDefinition[] = [
      {
          title: 'Streets',
          uri: this.getStyle('streets')
      },
      {
          title: 'Satellite',
          uri: this.getStyle('hybrid')
      },
      {
          title: 'Topography',
          uri: this.getStyle('topo')
      }
    ] ;
    this.map.addControl(new MapboxStyleSwitcherControl(styles, 'Streets') as IControl, 'top-left');

    // inspect mapbox plugin
    this.map.addControl(new InspectControl() as IControl, 'bottom-right');

      // Add geocoder controller.
    const geocoder = new Geocoder({
      accessToken: MAPBOXKEY, // localGeocoder: coordinatesGeocoder, zoom: 4, placeholder: 'Try: -40, 170',
      marker: false, // do not markup result
    });
    this.map.addControl(geocoder);    // add initial marker
    this.geoCoderMarker = new Marker({ color: 'var(--ion-color-primary'}); // Initialize a new marker

    this.map.on('load', () => {
      // Listen events from the Geocoder
      geocoder.on('result', (e) => {
        const place_name = e.result.place_name;
        const coordinates = e.result.geometry.coordinates;
        console.log('geocoder selection: ', place_name, coordinates);
        this.longitude = coordinates[0];
        this.latitude = coordinates[1];
        //  Add a marker at the result's coordinates
        const popup = new Popup().setText(`${place_name}\n${coordinates}`);
        this.geoCoderMarker.setLngLat(coordinates).setPopup(popup).addTo(this.map);
      });
      geocoder.on('clear', (e) => {
        // this.map.getSource('single-point').setData(e.result.geometry);
        console.log('geocoder input cleared');
        this.geoCoderMarker.remove();
      });
    });

    // fetch mouse coordinate for info box
    this.map.on('mousemove', (e) =>  { // e.point is the x, y coordinates of the mousemove event relative
      this.longitude = e.lngLat.lng;
      this.latitude = e.lngLat.lat;
    });

    // handle event for longPress behavior
    // this.longPressMarker.on('dragend', this.onLongPressMarkerDragEnd);
    this.map.on('touchstart', (e) => { this.onLongPressStart(e.originalEvent.timeStamp); });
    this.map.on('mousedown', (e) => { this.onLongPressStart(e.originalEvent.timeStamp); });
    this.map.on('move', _ => { this.onLongPressCancel(); });
    this.map.on('touchend', (e) => { this.onLongPressEnd(e); });
    this.map.on('mouseup', (e) => { this.onLongPressEnd(e); });
  }

  private getStyle(styleType: string) {
    // console.log('getStyle(): ', styleType);
    const styleUrl = `https://api.maptiler.com/maps/${styleType}/style.json?key=${MAPTYLERKEY}`;
    return styleUrl;
  }

  private onLongPressStart(timeStamp: number) {
    // console.log('longPressGesture onStart: ', timeStamp);
    this.longPressStartTimestamp = Math.floor(timeStamp);
    this.longPressActive = true;
  }

  private onLongPressEnd(e: any) {
    // console.log('longPressGesture onEnd: ', e);
    if (this.longPressActive) {
      this.longPressActive = false;
      const pressEndTimestamp = Math.floor(e.originalEvent.timeStamp);
      const isLongPress = (this.longPressStartTimestamp + this.longPressInterval ) < pressEndTimestamp;
      if (isLongPress) {
        // console.log('A longPress event occurred: ');
        //  Add a marker at the result's coordinates
        const coordinates: LngLatLike = [ e.lngLat.lng, e.lngLat.lat];
        const popup = new Popup().setText(`${coordinates[0].toFixed(6)} ${coordinates[1].toFixed(6)}`);
        this.longPressMarker.setLngLat(coordinates).setPopup(popup).addTo(this.map);
      }
    }
  }

  private onLongPressCancel() {
    if (this.longPressActive) { this.longPressActive = false; }
  }

  // private onLongPressMarkerDragEnd() {
  //   console.log('longPressMarker onDragEnd');
  //   const lngLat = this.longPressMarker.getLngLat();
  //   // const popup = this.longPressMarker.getPopup();
  //   // popup.setText(`${lngLat.lng.toFixed(6)} ${lngLat.lat.toFixed(6)}`);
  //   // this.longPressMarker.setPopup(popup).addTo(this.map);
  // }

  public async onPickerStyleMenuRequest(event) {
    // console.log('onPickerStyleMenuRequest(): ', event);
    const picker = await this.pickerCtl.create({
      columns: [{
        name: 'style',
        options: [
          {text: 'streets', value: 'streets'},
          {text: 'satellite', value: 'hybrid'},
          {text: 'topo', value: 'topo'}
        ]}],
      buttons: [
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value: `, value.style.value);
            this.style = value.style.value;
            this.map.setStyle(this.getStyle(this.style));
          }
        }
      ]
    });
    await picker.present();
    const pickerFeedback = await picker.onDidDismiss();
    console.log(`picker feedback: `, pickerFeedback);
  }

  public async onPopoverStyleMenuRequest(event) {
    // console.log('onPopoverStyleMenuRequest(): ', event);
    const popover = await this.popper.create({
      component: MapStyleMenuPopoverComponent,
      // event, // centered when event not provided
      backdropDismiss: true,
      showBackdrop: true,
      componentProps: { style: this.style, }
    });
    await popover.present();
    const popoverFeedback =  await popover.onDidDismiss();
    if (!popoverFeedback || !popoverFeedback.data || popoverFeedback.data.dismiss ) {
      console.log('MapStyleMenuPopoverComponent dismissed ...');
      return;
    }
    this.style = popoverFeedback.data.style;
    this.map.setStyle(this.getStyle(this.style));
  }
}
