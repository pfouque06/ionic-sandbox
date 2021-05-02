import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeafletForRasterMapPage } from './leaflet-for-raster-map.page';

describe('LeafletForRasterMapPage', () => {
  let component: LeafletForRasterMapPage;
  let fixture: ComponentFixture<LeafletForRasterMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletForRasterMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletForRasterMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
