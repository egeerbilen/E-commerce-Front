/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { CategoryManagementDataResolverService } from './category-management-data-resolver.service';

describe('Service: AddCategoryDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryManagementDataResolverService]
    });
  });

  it('should ...', inject([CategoryManagementDataResolverService], (service: CategoryManagementDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
