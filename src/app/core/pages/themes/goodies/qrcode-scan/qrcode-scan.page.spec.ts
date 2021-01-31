import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRcodeScanPage } from './qrcode-scan.page';

describe('QRcodeScanPage', () => {
  let component: QRcodeScanPage;
  let fixture: ComponentFixture<QRcodeScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRcodeScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRcodeScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
