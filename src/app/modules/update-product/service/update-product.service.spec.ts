/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { UpdateProductService } from './update-product.service';

describe('Service: UpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProductService]
    });
  });

  it('should ...', inject([UpdateProductService], (service: UpdateProductService) => {
    expect(service).toBeTruthy();
  }));
});
