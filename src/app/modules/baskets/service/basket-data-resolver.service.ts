import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketDataResolverService {
  /**
   * Constructor.
   * @param _basketService BasketService.
   */
  constructor(private _basketService: BasketService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<ProductDto[]> | null> {
    return this._basketService.getUserBasketProducts();
  }
}
