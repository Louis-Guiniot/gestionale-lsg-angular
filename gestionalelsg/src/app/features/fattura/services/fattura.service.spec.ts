import { TestBed } from '@angular/core/testing';

import { FatturaService } from './fattura.service';

describe('FatturaService', () => {
  let service: FatturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FatturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
