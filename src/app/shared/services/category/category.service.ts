import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiEndpoint } from '../../../enums/api-endpoint';
import { CategoryDto } from '../../dto/category-dto';
import { CreateCategoryDto } from '../../dto/create-category-dto';
import { CustomResponseDto } from '../../dto/custom-response-dto';
import { ApiHelperService } from '../api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   */
  constructor(private _http: ApiHelperService) {}

  /**
   * Get Categories.
   * @returns Categories values.
   */
  public getCategories(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._http.get(apiEndpoint.category + 'GetCategories');
  }

  /**
   * Add Category.
   * @param categoryDto CreateCategoryDto.
   * @returns Added category values.
   */
  public addCategory(categoryDto: CreateCategoryDto): Observable<CustomResponseDto<CategoryDto>> {
    return this._http.post(apiEndpoint.category + 'CreateCategory', categoryDto);
  }

  /**
   * Update Category.
   * @param categoryDto CategoryDto.
   * @returns Updated category values.
   */
  public updateCategory(categoryDto: CategoryDto): Observable<CustomResponseDto<null>> {
    return this._http.put(apiEndpoint.category + 'Update', categoryDto);
  }

  /**
   * Delete Category.
   * @param id Category ID.
   * @returns Deletion result.
   */
  public deleteCategory(id: number): Observable<CustomResponseDto<null>> {
    return this._http.delete(apiEndpoint.category + 'DeleteCategory/' + id);
  }
}
