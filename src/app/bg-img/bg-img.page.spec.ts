import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BgImgPage } from './bg-img.page';

describe('BgImgPage', () => {
  let component: BgImgPage;
  let fixture: ComponentFixture<BgImgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgImgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BgImgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
