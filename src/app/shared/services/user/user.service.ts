import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { UserLoginRequestDto } from '../../dto/login-dto';
import { UserDto } from '../../dto/user-dto';
import { UserUpdateDto } from '../../dto/user-update-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  /**
   * Update user by id.
   * @param userObject UserObject.
   * @returns Return.
   */
  public updateUser<T>(userObject: UserUpdateDto): any {
    return this.http.put<CustomResponseDto<T>>(this.apiEndpoint.user + 'Update/', userObject);
  }

  /**
   * Delete user by id.
   * @param userId User id.
   */
  public deleteUserById(userId: string): void {
    this.http.delete(this.apiEndpoint.user + 'Remove/' + userId);
  }

  /**
   * Get user by id.
   * @returns Products values.
   */
  public getUserById(): Observable<CustomResponseDto<UserDto[]>> {
    return this.http.get(this.apiEndpoint.user + 'GetById/' + this.userLocalStorageService.getUserId().toString());
  }

  /**
   * Get Products.
   * @param body UserLoginRequestDto.
   * @returns Products values.
   */
  public userLogin(body: UserLoginRequestDto): Observable<CustomResponseDto<string>> {
    return this.http.post(this.apiEndpoint.userLogin + 'Post', body);
  }
}
