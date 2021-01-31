import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarcodeScanPage } from './barcode-scan.page';

describe('BarcodeScanPage', () => {
  let component: BarcodeScanPage;
  let fixture: ComponentFixture<BarcodeScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarcodeScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
