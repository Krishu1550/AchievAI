import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionItem } from './create-action-item';

describe('CreateActionItem', () => {
  let component: CreateActionItem;
  let fixture: ComponentFixture<CreateActionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateActionItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActionItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
