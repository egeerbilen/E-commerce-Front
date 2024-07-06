/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

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
