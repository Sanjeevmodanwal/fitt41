import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MonthTabPage } from './month.page';

describe('MonthTabPage', () => {
  let component: MonthTabPage;
  let fixture: ComponentFixture<MonthTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
