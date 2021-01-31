import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRcodeGeneratorPage } from './qrcode-generator.page';

describe('QRcodeGeneratorPage', () => {
  let component: QRcodeGeneratorPage;
  let fixture: ComponentFixture<QRcodeGeneratorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRcodeGeneratorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRcodeGeneratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
