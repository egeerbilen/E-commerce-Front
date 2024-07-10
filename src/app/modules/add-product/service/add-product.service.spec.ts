/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { AddProductService } from './add-product.service';

describe('Service: AddProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProductService]
    });
  });

  it('should ...', inject([AddProductService], (service: AddProductService) => {
    expect(service).toBeTruthy();
  }));
});
