/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { HomeDataResolverService } from './home-data-resolver.service';

describe('Service: HomeDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeDataResolverService]
    });
  });

  it('should ...', inject([HomeDataResolverService], (service: HomeDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
