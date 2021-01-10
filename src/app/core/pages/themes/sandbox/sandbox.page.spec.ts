import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SandboxPage } from './sandbox.page';

describe('SandboxPage', () => {
  let component: SandboxPage;
  let fixture: ComponentFixture<SandboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SandboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
