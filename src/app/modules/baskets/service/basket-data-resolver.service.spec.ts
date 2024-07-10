/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { BasketDataResolverService } from './basket-data-resolver.service';

describe('Service: BasketDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketDataResolverService]
    });
  });

  it('should ...', inject([BasketDataResolverService], (service: BasketDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
