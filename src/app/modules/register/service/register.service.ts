import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserCreateDto } from 'src/app/shared/dto/user-create-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
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
  public userCreate(body: UserCreateDto): Observable<CustomResponseDto<UserCreateDto>> {
    return this._http.post(apiEndpoint.user + 'Create', body);
  }
}
