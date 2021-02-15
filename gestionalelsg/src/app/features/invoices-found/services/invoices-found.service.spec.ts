import { TestBed } from '@angular/core/testing';

import { InvoicesFoundService } from './invoices-found.service';

describe('InvoicesFoundService', () => {
  let service: InvoicesFoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesFoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
