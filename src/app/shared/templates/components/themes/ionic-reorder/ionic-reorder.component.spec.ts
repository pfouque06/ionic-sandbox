import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicReorderComponent } from './ionic-reorder.component';

describe('IonicReorderComponent', () => {
  let component: IonicReorderComponent;
  let fixture: ComponentFixture<IonicReorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicReorderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
