import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoal } from './create-goal';

describe('CreateGoal', () => {
  let component: CreateGoal;
  let fixture: ComponentFixture<CreateGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
