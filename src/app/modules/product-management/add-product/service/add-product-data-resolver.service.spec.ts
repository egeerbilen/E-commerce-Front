/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { AddProductDataResolverService } from './add-product-data-resolver.service';

describe('Service: AddProductDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProductDataResolverService]
    });
  });

  it('should ...', inject([AddProductDataResolverService], (service: AddProductDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
