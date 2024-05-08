import { TestBed } from '@angular/core/testing';

import { ApiFetcherService } from './api-fetcher.service';

describe('ApiFetcherService', () => {
  let service: ApiFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
