import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicModalsPopoversComponent } from './ionic-modals-popovers.component';

describe('IonicModalsPopoversComponent', () => {
  let component: IonicModalsPopoversComponent;
  let fixture: ComponentFixture<IonicModalsPopoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicModalsPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicModalsPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
