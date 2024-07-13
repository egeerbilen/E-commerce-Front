import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserCreateDto } from 'src/app/shared/dto/user-create-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {
  /**
   * Get Products.
   * @param body UserLoginRequestDto.
   * @returns Products values.
   */
  public userCreate(body: UserCreateDto): Observable<CustomResponseDto<UserCreateDto>> {
    return this.http.post(apiEndpoint.user + 'Create', body);
  }
}
