/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { ApiHelperService } from './api-helper.service';

describe('Service: ApiHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHelperService]
    });
  });

  it('should ...', inject([ApiHelperService], (service: ApiHelperService) => {
    expect(service).toBeTruthy();
  }));
});
