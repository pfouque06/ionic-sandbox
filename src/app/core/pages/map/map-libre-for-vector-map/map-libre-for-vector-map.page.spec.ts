import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapLibreForVectorMapPage } from './map-libre-for-vector-map.page';

describe('MapLibreForVectorMapPage', () => {
  let component: MapLibreForVectorMapPage;
  let fixture: ComponentFixture<MapLibreForVectorMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLibreForVectorMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapLibreForVectorMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
