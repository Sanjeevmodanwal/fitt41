import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WeeklyWorkoutPage } from './weekly-workout.page';

describe('WeeklyWorkoutPage', () => {
  let component: WeeklyWorkoutPage;
  let fixture: ComponentFixture<WeeklyWorkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyWorkoutPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
