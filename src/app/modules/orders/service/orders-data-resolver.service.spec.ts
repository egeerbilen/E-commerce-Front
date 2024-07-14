/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { OrdersDataResolverService } from './orders-data-resolver.service';

describe('Service: OrdersDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersDataResolverService]
    });
  });

  it('should ...', inject([OrdersDataResolverService], (service: OrdersDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
