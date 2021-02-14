import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialsMenuPage } from './materials-menu.page';

describe('MaterialsMenuPage', () => {
  let component: MaterialsMenuPage;
  let fixture: ComponentFixture<MaterialsMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
