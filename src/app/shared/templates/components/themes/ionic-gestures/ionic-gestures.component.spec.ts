import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicGesturesComponent } from './ionic-gestures.component';

describe('IonicGesturesComponent', () => {
  let component: IonicGesturesComponent;
  let fixture: ComponentFixture<IonicGesturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicGesturesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicGesturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
