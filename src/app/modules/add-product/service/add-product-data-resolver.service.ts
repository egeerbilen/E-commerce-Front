import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { CategoriyService } from 'src/app/shared/services/categoriy/categoriy.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param _categoriyService CategoriyService.
   */
  constructor(
    protected http: ApiHelperService,
    private _categoriyService: CategoriyService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this.getCategories();
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getCategories(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._categoriyService.getCategories();
  }
}
