import { TestBed } from '@angular/core/testing';

import { PartSearchService } from './part-search.service';

describe('PartSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartSearchService = TestBed.get(PartSearchService);
    expect(service).toBeTruthy();
  });
});
