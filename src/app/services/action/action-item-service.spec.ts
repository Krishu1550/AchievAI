import { TestBed } from '@angular/core/testing';

import { ActionItemService } from './action-item-service';

describe('ActionItemService', () => {
  let service: ActionItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
