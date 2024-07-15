import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserRolesDto } from 'src/app/shared/dto/user-roles-dto';
import { UserUpdateDto } from 'src/app/shared/dto/user-update-dto';
import { UserWithRolesDto } from 'src/app/shared/dto/user-with-roles-dto';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  resolvedUserData!: CustomResponseDto<UserWithRolesDto[]>;
  users: UserWithRolesDto[] = [];
  roles: string[] = ['SuperUser', 'Admin', 'User', 'Create', 'Update'];
  newRole: string | null = null;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'roles', 'actions'];
  dataSource!: MatTableDataSource<UserWithRolesDto>;

  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _userService UserService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.resolvedUserData = data['resolvedData'];
      this.users = this.resolvedUserData.data || [];
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.resolvedUserData);
    });
  }

  /**
   * NgAfterViewInit.
   */
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Sort işlemi burada atanır
  }

  /**
   * UpdateUserRoles.
   * @param user User.
   */
  public updateUserRoles(user: UserWithRolesDto): void {
    console.log('Updating roles for user: ', user);
    const updateUser: UserUpdateDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      roles: user.roles.map((role) => role.roleName)
    };
    this._userService.updateUser(updateUser).subscribe((response: any) => {
      console.log('Roles updated: ', response);
    });
  }

  /**
   * DeleteUser.
   * @param userId UserId.
   */
  public deleteUser(userId: number): void {
    this._userService.deleteUserById(userId).subscribe((response: any) => {
      console.log('User deleted: ', userId);
      this.users = this.users.filter((user) => user.id !== userId);
      this.dataSource.data = this.users;
    });
  }

  /**
   * RemoveRoleFromUser.
   * @param user User.
   * @param role Role.
   */
  public removeRoleFromUser(user: UserWithRolesDto, role: UserRolesDto): void {
    user.roles = user.roles.filter((r) => r.roleId !== role.roleId);
    this.updateUserRoles(user);
  }

  /**
   * AddRoleToUser.
   * @param user User.
   * @param roleName RoleName.
   */
  public addRoleToUser(user: UserWithRolesDto, roleName: string): void {
    if (roleName && !user.roles.some((r) => r.roleName === roleName)) {
      const roleId = this.roles.indexOf(roleName) + 1;
      user.roles.push({ roleId, roleName });
      this.newRole = null;
      this.updateUserRoles(user);
    }
  }
}
