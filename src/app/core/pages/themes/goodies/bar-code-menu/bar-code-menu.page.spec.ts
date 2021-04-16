import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarCodeMenuPage } from './bar-code-menu.page';

describe('BarCodeMenuPage', () => {
  let component: BarCodeMenuPage;
  let fixture: ComponentFixture<BarCodeMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCodeMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarCodeMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
