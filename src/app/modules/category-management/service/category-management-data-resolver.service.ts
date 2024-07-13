import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementDataResolverService {
  /**
   * Constructor.
   * @param _categoriyService CategoriyService.
   */
  constructor(private _categoriyService: CategoryService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._categoriyService.getCategories();
  }
}
