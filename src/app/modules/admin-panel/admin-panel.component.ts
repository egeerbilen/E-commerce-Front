import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/helpers/service/toast/toast.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserRolesDto } from 'src/app/shared/dto/user-roles-dto';
import { UserWithRolesDto } from 'src/app/shared/dto/user-with-roles-dto';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserRoleService } from 'src/app/shared/services/user-role/user-role.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  resolvedUserData!: CustomResponseDto<UserWithRolesDto[]>;
  users: UserWithRolesDto[] = [];
  roles: string[] = ['SuperUser', 'Admin', 'User', 'Create', 'Update'];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'roles', 'actions'];
  dataSource!: MatTableDataSource<UserWithRolesDto>;

  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _userService UserService.
   * @param _userRoleService UserRoleService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _userRoleService: UserRoleService,
    private _toastService: ToastService
  ) {}

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.resolvedUserData = data['resolvedData'];
      this.users = this.resolvedUserData.data || [];
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  /**
   * NgAfterViewInit.
   */
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * DeleteUser.
   * @param userId UserId.
   */
  public deleteUser(userId: number): void {
    this._userService.deleteUserById(userId).subscribe(() => {
      this._toastService.show('User deleted: ' + userId);
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
    this._userRoleService.removeUserRole(user.id, role.roleId).subscribe(() => {
      this._toastService.show('Role removed: ' + role.roleName);
      user.roles = user.roles.filter((r) => r.roleId !== role.roleId);
      this.dataSource.data = this.users;
    });
  }

  /**
   * AddRoleToUser.
   * @param user User.
   * @param roleName RoleName.
   */
  public addRoleToUser(user: UserWithRolesDto, roleName: string): void {
    if (roleName && !user.roles.some((r) => r.roleName === roleName)) {
      this._toastService.show('Role removed: ' + roleName + ' to user:' + user.email);
      const roleId = this.roles.indexOf(roleName) + 1;
      this._userRoleService.addUserRole(user.id, roleId).subscribe(
        () => {
          this._toastService.show('Role added: ' + roleName + ' to user:' + user.email);
          user.roles.push({ roleId, roleName });
          user.newRole = undefined;
          this.dataSource.data = this.users;
        },
        (error) => {
          this._toastService.show('Error adding role: ' + error);
        }
      );
    } else {
      this._toastService.show('Role already exists or invalid: ' + roleName);
    }
  }

  /**
   * OnAddRoleButtonClick.
   * @param user User.
   */
  public onAddRoleButtonClick(user: UserWithRolesDto): void {
    if (user.newRole) {
      this.addRoleToUser(user, user.newRole);
    }
  }
}
