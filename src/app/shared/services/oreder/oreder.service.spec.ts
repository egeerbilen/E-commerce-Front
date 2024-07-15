/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { OrederService } from './oreder.service';

describe('Service: Oreder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrederService]
    });
  });

  it('should ...', inject([OrederService], (service: OrederService) => {
    expect(service).toBeTruthy();
  }));
});
