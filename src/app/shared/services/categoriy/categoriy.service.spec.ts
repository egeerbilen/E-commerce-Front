/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { CategoriyService } from './categoriy.service';

describe('Service: Categoriy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriyService]
    });
  });

  it('should ...', inject([CategoriyService], (service: CategoriyService) => {
    expect(service).toBeTruthy();
  }));
});
