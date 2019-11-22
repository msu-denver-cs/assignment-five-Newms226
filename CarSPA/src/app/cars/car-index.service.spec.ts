import { TestBed } from '@angular/core/testing';

import { CarIndexService } from './car-index.service';

describe('CarIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarIndexService = TestBed.get(CarIndexService);
    expect(service).toBeTruthy();
  });
});
