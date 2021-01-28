import { TestBed } from '@angular/core/testing';

import { CustomerUpdateService } from './customer-update.service';

describe('CustomerUpdateService', () => {
  let service: CustomerUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
