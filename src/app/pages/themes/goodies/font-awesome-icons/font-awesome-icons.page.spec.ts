import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FontAwesomeIconsPage } from './font-awesome-icons.page';

describe('FontAwesomeIconsPage', () => {
  let component: FontAwesomeIconsPage;
  let fixture: ComponentFixture<FontAwesomeIconsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontAwesomeIconsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FontAwesomeIconsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
