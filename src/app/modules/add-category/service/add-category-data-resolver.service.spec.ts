/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { AddCategoryDataResolverService } from './add-category-data-resolver.service';

describe('Service: AddCategoryDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCategoryDataResolverService]
    });
  });

  it('should ...', inject([AddCategoryDataResolverService], (service: AddCategoryDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
