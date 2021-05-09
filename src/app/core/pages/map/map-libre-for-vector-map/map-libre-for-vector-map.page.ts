import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PickerController, PopoverController } from '@ionic/angular';
import { FullscreenControl, GeolocateControl, IControl, Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { InspectControl, RulerControl } from 'mapbox-gl-controls';
// import { MapboxTraffic } from 'mapbox-gl-traffic';
import * as Geocoder from '@mapbox/mapbox-gl-geocoder';
import { MapStyleMenuPopoverComponent } from 'src/app/shared/templates/popover/map-style-menu-popover/map-style-menu-popover.component';

type NewType = string;
const MAPTYLERKEY = 'get_your_own_OpIi9ZULNHzrESv6T2vL';

@Component({
  selector: 'app-map-libre-for-vector-map',
  templateUrl: './map-libre-for-vector-map.page.html',
  styleUrls: ['./map-libre-for-vector-map.page.scss'],
})
export class MapLibreForVectorMapPage implements OnInit {

  private map: Map;
  public style: NewType = 'streets';
  public infoToggle = true;
  @ViewChild('info', { read: ElementRef }) infoRef: ElementRef;

    // Location coordinates : default : Nice
  public latitude: any = '43.70194';
  public longitude: any = '7.26833';
  public zoom = 11;

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
      // style: `https://api.maptiler.com/maps/hybrid/style.json?key=${mapTilerKey}`, // satellite URL
      // style: `https://api.maptiler.com/maps/topo/style.json?key=${mapTilerKey}`, // topo URL
      style: this.getStyle('streets'),
      center: [this.longitude, this.latitude], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      // maxPitch: 60
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

    // add style switch feom mapbox plugin
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
      accessToken: 'pk.eyJ1IjoicGZvdXF1ZSIsImEiOiJja29nOWVkN2YwbjIxMnVwMnNoNGowZWxmIn0.7-6PluWO1DpTocbzUvVAqQ',
      // localGeocoder: coordinatesGeocoder, zoom: 4, placeholder: 'Try: -40, 170',
      marker: false, // mapboxgl: this.map,
    })
    this.map.addControl(geocoder);    // add initial marker
    var marker = new Marker({ color: 'var(--ion-color-primary'}) // Initialize a new marker
      .setLngLat([0, 0]) // Marker [lng, lat] coordinates
      .addTo(this.map) // Add the marker to the map

    this.map.on('load', () => {
      // add a source layer and default styling for a single point

      // Listen events from the Geocoder
      geocoder.on('result', (e) => {
        const place_name = e.result.place_name;
        const coordinates = e.result.geometry.coordinates
        console.log('geocoder selection: ', place_name, coordinates);
        this.longitude = coordinates[0];
        this.latitude = coordinates[1];
        //  Add a marker at the result's coordinates
        const popup = new Popup().setText(`${place_name}\n${coordinates}`);
        marker.setLngLat(e.result.geometry.coordinates).setPopup(popup);
      });
      geocoder.on('clear', (e) => {
        // this.map.getSource('single-point').setData(e.result.geometry);
        console.log('geocoder input cleared');
        marker.setLngLat([0, 0]);
      });
    });

    this.map.on('mousemove', (e) =>  {
      // e.point is the x, y coordinates of the mousemove event relative
      this.longitude = e.lngLat.lng;
      this.latitude = e.lngLat.lat;
      });
  }

  private getStyle(styleType: string) {
    // console.log('getStyle(): ', styleType);
    const styleUrl = `https://api.maptiler.com/maps/${styleType}/style.json?key=${MAPTYLERKEY}`
    return styleUrl;
  }

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
