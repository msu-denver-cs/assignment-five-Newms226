import { TestBed } from '@angular/core/testing';

import { MakeSearchService } from './make-search.service';

describe('MakeSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MakeSearchService = TestBed.get(MakeSearchService);
    expect(service).toBeTruthy();
  });
});
