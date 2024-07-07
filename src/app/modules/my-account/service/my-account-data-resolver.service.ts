import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param _localStorageService LocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    private _localStorageService: LocalStorageService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<UserDto[]>> {
    return this.getUserById();
  }

  /**
   * Get user by id.
   * @returns Products values.
   */
  public getUserById(): Observable<CustomResponseDto<UserDto[]>> {
    return this.http.get(apiEndpoint.user + 'GetById/' + this._localStorageService.getUserId().toString());
  }
}
