import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StartWorkoutPage } from './start-workout.page';

describe('StartWorkoutPage', () => {
  let component: StartWorkoutPage;
  let fixture: ComponentFixture<StartWorkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartWorkoutPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StartWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
