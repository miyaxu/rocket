import { TestBed } from '@angular/core/testing';

import { RockerService } from './rocker.service';

describe('RockerService', () => {
  let service: RockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
