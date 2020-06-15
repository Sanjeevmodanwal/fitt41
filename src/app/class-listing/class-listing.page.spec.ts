import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassListingPage } from './class-listing.page';

describe('ClassListingPage', () => {
  let component: ClassListingPage;
  let fixture: ComponentFixture<ClassListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
