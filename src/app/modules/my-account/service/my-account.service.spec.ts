/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { MyAccountService } from './my-account.service';

describe('Service: MyAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAccountService]
    });
  });

  it('should ...', inject([MyAccountService], (service: MyAccountService) => {
    expect(service).toBeTruthy();
  }));
});
