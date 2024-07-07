import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   */
  constructor(protected http: ApiHelperService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<{ getProducts: CustomResponseDto<ProductDto[]>; getCategories: CustomResponseDto<CategoryDto[]> }> {
    return forkJoin({
      getProducts: this.getProducts(),
      getCategories: this.getCategories()
    });
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getProducts(): Observable<CustomResponseDto<ProductDto[]>> {
    return this.http.get(apiEndpoint.product + 'GetProducts');
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getCategories(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this.http.get(apiEndpoint.category + 'GetCategories');
  }
}
