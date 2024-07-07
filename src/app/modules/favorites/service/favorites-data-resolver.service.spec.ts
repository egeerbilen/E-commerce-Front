/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoritesDataResolverService } from './favorites-data-resolver.service';

describe('Service: FavoritesDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesDataResolverService]
    });
  });

  it('should ...', inject([FavoritesDataResolverService], (service: FavoritesDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
