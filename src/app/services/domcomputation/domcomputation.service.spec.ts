import { TestBed } from '@angular/core/testing';

import { DOMComputationService } from './domcomputation.service';

describe('DOMComputationService', () => {
  let service: DOMComputationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DOMComputationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
