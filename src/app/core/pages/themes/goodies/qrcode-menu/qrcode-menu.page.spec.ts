import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRCodeMenuPage } from './qrcode-menu.page';

describe('QRCodeMenuPage', () => {
  let component: QRCodeMenuPage;
  let fixture: ComponentFixture<QRCodeMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRCodeMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRCodeMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
