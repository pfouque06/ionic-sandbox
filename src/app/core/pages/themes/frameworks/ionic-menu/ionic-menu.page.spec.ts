import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicMenuPage } from './ionic-menu.page';

describe('IonicMenuPage', () => {
  let component: IonicMenuPage;
  let fixture: ComponentFixture<IonicMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
