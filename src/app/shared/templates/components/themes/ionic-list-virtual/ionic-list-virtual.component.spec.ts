import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicListVirtualComponent } from './ionic-list-virtual.component';

describe('IonicListVirtualComponent', () => {
  let component: IonicListVirtualComponent;
  let fixture: ComponentFixture<IonicListVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicListVirtualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicListVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
