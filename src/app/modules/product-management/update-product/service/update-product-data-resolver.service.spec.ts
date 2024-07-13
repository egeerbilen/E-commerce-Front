/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { UpdateProductDataResolverService } from './update-product-data-resolver.service';

describe('Service: UpdateProductDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProductDataResolverService]
    });
  });

  it('should ...', inject([UpdateProductDataResolverService], (service: UpdateProductDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
