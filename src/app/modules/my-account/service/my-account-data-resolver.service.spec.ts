/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { MyAccountDataResolverService } from './my-account-data-resolver.service';

describe('Service: MyAccountDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAccountDataResolverService]
    });
  });

  it('should ...', inject([MyAccountDataResolverService], (service: MyAccountDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
