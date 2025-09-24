import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackToken } from './call-back-token';

describe('CallBackToken', () => {
  let component: CallBackToken;
  let fixture: ComponentFixture<CallBackToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBackToken]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBackToken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
