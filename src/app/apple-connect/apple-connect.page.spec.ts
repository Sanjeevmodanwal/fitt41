import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppleConnectPage } from './apple-connect.page';

describe('AppleConnectPage', () => {
  let component: AppleConnectPage;
  let fixture: ComponentFixture<AppleConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppleConnectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppleConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
