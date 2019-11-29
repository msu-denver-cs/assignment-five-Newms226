import { TestBed } from '@angular/core/testing';

import { CarSearchService } from './car-search.service';

describe('CarSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarSearchService = TestBed.get(CarSearchService);
    expect(service).toBeTruthy();
  });
});
