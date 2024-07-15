/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { BasketProdcutService } from './basket-product.service';

describe('Service: Basket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketProdcutService]
    });
  });

  it('should ...', inject([BasketProdcutService], (service: BasketProdcutService) => {
    expect(service).toBeTruthy();
  }));
});
