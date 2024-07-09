/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

describe('Service: Home', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeService]
    });
  });

  it('should ...', inject([HomeService], (service: HomeService) => {
    expect(service).toBeTruthy();
  }));
});
