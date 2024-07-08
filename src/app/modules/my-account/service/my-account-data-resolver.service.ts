import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param _userLocalStorageService LocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    private _userLocalStorageService: UserLocalStorageService
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
    return this.http.get(apiEndpoint.user + 'GetById/' + this._userLocalStorageService.getUserId().toString());
  }
}
