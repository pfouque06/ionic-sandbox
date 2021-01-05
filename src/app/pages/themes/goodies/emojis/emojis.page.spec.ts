import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmojisPage } from './emojis.page';

describe('EmojisPage', () => {
  let component: EmojisPage;
  let fixture: ComponentFixture<EmojisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmojisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
