/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasketsService } from './baskets.service';

describe('Service: Baskets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketsService]
    });
  });

  it('should ...', inject([BasketsService], (service: BasketsService) => {
    expect(service).toBeTruthy();
  }));
});
