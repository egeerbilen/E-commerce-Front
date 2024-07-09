/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { LoadingPageService } from './loading-page.service';

describe('Service: Loading', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingPageService]
    });
  });

  it('should ...', inject([LoadingPageService], (service: LoadingPageService) => {
    expect(service).toBeTruthy();
  }));
});
