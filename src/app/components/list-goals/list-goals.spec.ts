import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoals } from './list-goals';

describe('ListGoals', () => {
  let component: ListGoals;
  let fixture: ComponentFixture<ListGoals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGoals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGoals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
