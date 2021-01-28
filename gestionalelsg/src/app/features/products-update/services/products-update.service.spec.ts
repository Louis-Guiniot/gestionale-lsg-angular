import { TestBed } from '@angular/core/testing';

import { ProductsUpdateService } from './products-update.service';

describe('ProductsUpdateService', () => {
  let service: ProductsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
