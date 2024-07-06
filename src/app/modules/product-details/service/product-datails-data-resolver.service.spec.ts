/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductDatailsDataResolverService } from './product-datails-data-resolver.service';

describe('Service: ProductDatailsDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDatailsDataResolverService]
    });
  });

  it('should ...', inject([ProductDatailsDataResolverService], (service: ProductDatailsDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
