/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { UserLocalStorageService } from './user-local-storage.service';

describe('Service: LocalStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocalStorageService]
    });
  });

  it('should ...', inject([UserLocalStorageService], (service: UserLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
