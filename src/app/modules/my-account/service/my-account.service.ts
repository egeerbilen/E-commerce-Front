import { Injectable } from '@angular/core';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserUpdateDto } from 'src/app/shared/dto/user-update-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { HomeDataResolverService } from '../../home/service/home-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService extends HomeDataResolverService {
  /**
   * Update user by id.
   * @param userObject UserObject.
   * @returns Return.
   */
  public updateUser<T>(userObject: UserUpdateDto): any {
    return this._http.put<CustomResponseDto<T>>(apiEndpoint.user + 'Update/', userObject);
  }

  /**
   * Delete user by id.
   * @param userId User id.
   */
  public deleteUserById(userId: string): void {
    this._http.delete(apiEndpoint.user + 'Remove/' + userId);
  }
}
