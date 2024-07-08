import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   */
  constructor(private _http: ApiHelperService) {}

  /**
   * Get Products.
   * @param id Number.
   * @returns Products values.
   */
  public deleteProduct(id: number): Observable<CustomResponseDto<null>> {
    console.log(apiEndpoint.product + 'Delete/' + id.toString());
    return this._http.delete(apiEndpoint.product + 'Delete/' + id.toString());
  }
}
