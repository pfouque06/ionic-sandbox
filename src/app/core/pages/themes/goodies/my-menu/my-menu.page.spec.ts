import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMenuPage } from './my-menu.page';

describe('MyMenuPage', () => {
  let component: MyMenuPage;
  let fixture: ComponentFixture<MyMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
