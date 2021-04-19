import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeaserBetaVersionComponent } from './teaser-beta-version.component';

describe('TeaserBetaVersionComponent', () => {
  let component: TeaserBetaVersionComponent;
  let fixture: ComponentFixture<TeaserBetaVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaserBetaVersionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeaserBetaVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
