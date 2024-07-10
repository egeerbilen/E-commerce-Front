import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { HomeDataResolverService } from './home-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HomeDataResolverService {
  /**
   * Get Products.
   * @param id Number.
   * @returns Products values.
   */
  public deleteProduct(id: number): Observable<CustomResponseDto<null>> {
    return this.http.delete(apiEndpoint.product + 'DeleteProductWithDependencies/' + id.toString());
  }
}
