import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicFabsComponent } from './ionic-fabs.component';

describe('IonicFabsComponent', () => {
  let component: IonicFabsComponent;
  let fixture: ComponentFixture<IonicFabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicFabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicFabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
