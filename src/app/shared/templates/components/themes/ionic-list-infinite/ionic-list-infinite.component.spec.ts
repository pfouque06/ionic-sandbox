import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicListInfiniteComponent } from './ionic-list-infinite.component';

describe('IonicListInfiniteComponent', () => {
  let component: IonicListInfiniteComponent;
  let fixture: ComponentFixture<IonicListInfiniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicListInfiniteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicListInfiniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
