import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputsPage } from './inputs.page';

describe('InputsPage', () => {
  let component: InputsPage;
  let fixture: ComponentFixture<InputsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
