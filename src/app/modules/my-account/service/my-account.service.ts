import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { DecodedTokenDto } from 'src/app/shared/dto/decoded-token-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   * @param _localStorageService LocalStorageService.
   */
  constructor(
    private _http: ApiHelperService,
    private _localStorageService: LocalStorageService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<UserDto[]>> {
    const decodedToken = this._localStorageService.getDecodedToken() as DecodedTokenDto;
    return this.getUserById(decodedToken.userId.toString());
  }

  /**
   * Get Products.
   * @param userId User id.
   * @returns Products values.
   */
  public getUserById(userId: string): Observable<CustomResponseDto<UserDto[]>> {
    return this._http.get(apiEndpoint.user + 'GetById/' + userId);
  }
}
