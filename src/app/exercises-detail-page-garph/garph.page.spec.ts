import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GarphPage } from './garph.page';

describe('Tab3Page', () => {
  let component: GarphPage;
  let fixture: ComponentFixture<GarphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GarphPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GarphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
