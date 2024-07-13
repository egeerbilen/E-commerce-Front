import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { ProductCreateDto } from '../../dto/product-create-dto';
import { ProductDto } from '../../dto/product-dto';
import { ProductUpdateDto } from '../../dto/product-update-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  /**
   * Get Products.
   * @param productId String.
   * @returns Products values.
   */
  public getProductById(productId: string): Observable<CustomResponseDto<ProductDto>> {
    return this.http.get(this.apiEndpoint.product + 'GetById/' + productId);
  }

  /**
   * Update product by id.
   * @param productObject Product object.
   * @returns Return.
   */
  public updateProduct(productObject: ProductUpdateDto): Observable<CustomResponseDto<null>> {
    return this.http.put(this.apiEndpoint.product + 'Update/', productObject);
  }

  /**
   * Delete product by id.
   * @param productId Product id.
   */
  public deleteProductById(productId: string): void {
    this.http.delete(this.apiEndpoint.product + 'DeleteProductWithDependencies/' + productId);
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getProducts(): Observable<CustomResponseDto<ProductDto[]>> {
    return this.http.get(this.apiEndpoint.product + 'GetProducts');
  }

  /**
   * Get Products.
   * @param id Number.
   * @returns Products values.
   */
  public deleteProduct(id: number): Observable<CustomResponseDto<null>> {
    return this.http.delete(this.apiEndpoint.product + 'DeleteProductWithDependencies/' + id.toString());
  }

  /**
   * Get Products.
   * @param productCreateDto ProductCreateDto.
   * @returns Products values.
   */
  public addProduct(productCreateDto: ProductCreateDto): Observable<CustomResponseDto<null>> {
    return this.http.post(this.apiEndpoint.product + 'Create/', productCreateDto);
  }
}
