import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserLoginRequestDto } from 'src/app/shared/dto/login-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   */
  constructor(private _http: ApiHelperService) {}

  /**
   * Get Products.
   * @param body UserLoginRequestDto.
   * @returns Products values.
   */
  public userLogin(body: UserLoginRequestDto): Observable<CustomResponseDto<string>> {
    return this._http.post(apiEndpoint.userLogin + 'Post', body);
  }
}
