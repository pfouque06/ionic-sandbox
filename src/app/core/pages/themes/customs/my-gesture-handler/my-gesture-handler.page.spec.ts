import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyGestureHandlerPage } from './my-gesture-handler.page';

describe('MyGestureHandlerPage', () => {
  let component: MyGestureHandlerPage;
  let fixture: ComponentFixture<MyGestureHandlerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGestureHandlerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyGestureHandlerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
