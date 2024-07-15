import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserWithRolesDto } from 'src/app/shared/dto/user-with-roles-dto';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelDataResolverService {
  /**
   * Constructor.
   * @param _userService UserService.
   */
  constructor(private _userService: UserService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<UserWithRolesDto[]>> {
    return this._userService.getAllUsersWithRoles();
  }
}
