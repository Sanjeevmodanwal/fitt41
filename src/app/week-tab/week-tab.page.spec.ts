import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WeekTabPage } from './week-tab.page';

describe('WeekTabPage', () => {
  let component: WeekTabPage;
  let fixture: ComponentFixture<WeekTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeekTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
