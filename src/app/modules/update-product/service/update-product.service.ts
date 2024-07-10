import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductUpdateDto } from 'src/app/shared/dto/product-update-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   * @param _userLocalStorageService UserLocalStorageService.
   */
  constructor(
    private _http: ApiHelperService,
    private _userLocalStorageService: UserLocalStorageService
  ) {}

  /**
   * Update product by id.
   * @param productObject Product object.
   * @returns Return.
   */
  public updateProduct(productObject: ProductUpdateDto): Observable<CustomResponseDto<null>> {
    return this._http.put(apiEndpoint.product + 'Update/', productObject);
  }

  /**
   * Delete product by id.
   * @param productId Product id.
   */
  public deleteProductById(productId: string): void {
    this._http.delete(apiEndpoint.product + 'DeleteProductWithDependencies/' + productId);
  }
}
