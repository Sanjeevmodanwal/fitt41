import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassNamePage } from './class-name.page';

describe('ClassNamePage', () => {
  let component: ClassNamePage;
  let fixture: ComponentFixture<ClassNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
