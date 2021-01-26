import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IconsPage } from './icons.page';

describe('IconsPage', () => {
  let component: IconsPage;
  let fixture: ComponentFixture<IconsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
