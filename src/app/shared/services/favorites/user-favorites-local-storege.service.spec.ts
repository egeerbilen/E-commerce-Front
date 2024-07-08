/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { UserLocalStoregeFavoritesService } from './user-favorites-local-storege.service';

describe('Service: UserLocalStoregeFavorites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocalStoregeFavoritesService]
    });
  });

  it('should ...', inject([UserLocalStoregeFavoritesService], (service: UserLocalStoregeFavoritesService) => {
    expect(service).toBeTruthy();
  }));
});
