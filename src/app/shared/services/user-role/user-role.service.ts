import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends BaseService {
  /**
   * Add a role to a user.
   * @param userId Number.
   * @param roleId Number.
   * @returns Observable<CustomResponseDto>.
   */
  public addUserRole(userId: number, roleId: number): Observable<CustomResponseDto<null>> {
    return this.http.post(this.apiEndpoint.userRoles + 'AddUserRole/userId/' + userId + '/roleId/' + roleId, {});
  }

  /**
   * Remove a role from a user.
   * @param userId Number.
   * @param roleId Number.
   * @returns Observable<CustomResponseDto>.
   */
  public removeUserRole(userId: number, roleId: number): Observable<CustomResponseDto<null>> {
    return this.http.delete(this.apiEndpoint.userRoles + 'RemoveUserRole/userId/' + userId + '/roleId/' + roleId);
  }
}
