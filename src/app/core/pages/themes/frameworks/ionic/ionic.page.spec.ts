import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicPage } from './ionic.page';

describe('IonicPage', () => {
  let component: IonicPage;
  let fixture: ComponentFixture<IonicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
