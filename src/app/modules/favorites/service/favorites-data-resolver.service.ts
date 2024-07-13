import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { FavoriteService } from 'src/app/shared/services/favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataResolverService {
  /**
   * Constructor.
   * @param _favoriteService FavoriteService.
   */
  constructor(private _favoriteService: FavoriteService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<ProductDto[]> | null> {
    return this._favoriteService.getUserFavoritesProducts();
  }
}
