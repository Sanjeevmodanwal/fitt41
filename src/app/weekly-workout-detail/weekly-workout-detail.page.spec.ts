import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WeeklyWorkoutDetailPage } from './weekly-workout-detail.page';

describe('WeeklyWorkoutDetailPage', () => {
  let component: WeeklyWorkoutDetailPage;
  let fixture: ComponentFixture<WeeklyWorkoutDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyWorkoutDetailPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyWorkoutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
