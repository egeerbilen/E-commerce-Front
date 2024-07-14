/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { OrderProducService } from './orders-product.service';

describe('Service: Orders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderProducService]
    });
  });

  it('should ...', inject([OrderProducService], (service: OrderProducService) => {
    expect(service).toBeTruthy();
  }));
});
