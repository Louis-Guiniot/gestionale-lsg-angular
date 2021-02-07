import { TestBed } from '@angular/core/testing';

import { TabbedInvoicesService } from './tabbed-invoices.service';

describe('TabbedInvoicesService', () => {
  let service: TabbedInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabbedInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
