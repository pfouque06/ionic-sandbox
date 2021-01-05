import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpinnersPage } from './spinners.page';

describe('SpinnersPage', () => {
  let component: SpinnersPage;
  let fixture: ComponentFixture<SpinnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
