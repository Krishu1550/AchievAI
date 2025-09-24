import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnLanguage } from './learn-language';

describe('LearnLanguage', () => {
  let component: LearnLanguage;
  let fixture: ComponentFixture<LearnLanguage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnLanguage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnLanguage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
