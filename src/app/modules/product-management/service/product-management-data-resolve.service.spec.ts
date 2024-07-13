/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { ProductManagementDataResolveService } from './product-management-data-resolve.service';

describe('Service: AdminPanelDataResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductManagementDataResolveService]
    });
  });

  it('should ...', inject([ProductManagementDataResolveService], (service: ProductManagementDataResolveService) => {
    expect(service).toBeTruthy();
  }));
});
