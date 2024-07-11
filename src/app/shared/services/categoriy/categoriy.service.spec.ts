/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
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
