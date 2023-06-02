import { TestBed } from '@angular/core/testing';

import { DatasourceTestService } from './datasource-test.service';

describe('DatasourceTestService', () => {
  let service: DatasourceTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
