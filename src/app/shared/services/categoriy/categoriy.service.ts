import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryDto } from '../../dto/category-dto';
import { CreateCategoryDto } from '../../dto/create-category-dto';
import { CustomResponseDto } from '../../dto/custom-response-dto';
import { apiEndpoint } from '../../enviroments/api-endpoint';
import { ApiHelperService } from '../api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriyService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   */
  constructor(private _http: ApiHelperService) {}

  /**
   * Get Products.
   * @returns Products values.
   */
  public getCategories(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._http.get(apiEndpoint.category + 'GetCategories');
  }

  /**
   * Get Products.
   * @param categortDto CategortDto.
   * @returns Products values.
   */
  public addCategories(categortDto: CreateCategoryDto): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._http.post(apiEndpoint.category + 'CreateCategory', categortDto);
  }
}
