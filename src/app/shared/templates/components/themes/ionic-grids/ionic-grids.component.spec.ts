import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicGridsComponent } from './ionic-grids.component';

describe('IonicGridsComponent', () => {
  let component: IonicGridsComponent;
  let fixture: ComponentFixture<IonicGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicGridsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
