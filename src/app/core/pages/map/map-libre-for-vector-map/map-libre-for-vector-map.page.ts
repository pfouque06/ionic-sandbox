import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PickerController, PopoverController } from '@ionic/angular';
import { FullscreenControl, GeolocateControl, Map, NavigationControl } from 'maplibre-gl';
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
  @ViewChild('styleToggleId', { read: ElementRef }) styleToggleRef: ElementRef;

    // Location coordinates : default : Nice / Colline du château / point de vue
  public latitude: any = '43.695939';
  public longitude: any = '7.279748';
  public zoom = 12;

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
    // this.map.addControl(new FullscreenControl({container: document.querySelector('body')}));
    this.map.addControl(new FullscreenControl(), 'top-left');
    this.map.addControl(new NavigationControl({ visualizePitch: true }), 'top-left');
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
    // map.addControl(
    //   new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   localGeocoder: coordinatesGeocoder,
    //   zoom: 4,
    //   placeholder: 'Try: -40, 170',
    //   mapboxgl: mapboxgl
    //   })
    //   );
  }

  private getStyle(styleType: string) {
    // console.log('getStyle(): ', styleType);
    const styleUrl = `https://api.maptiler.com/maps/${styleType}/style.json?key=${MAPTYLERKEY}`
    return styleUrl;
  }

  // public  onStyleToggleChange(event) {
  //   console.log('onStyleToggleChange(): ', event.detail.value);
  //   this.style = event.detail.value;
  //   this.map.setStyle(this.getStyle(this.style));
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
