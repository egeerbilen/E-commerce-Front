import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { ToastService } from 'src/app/helpers/service/toast/toast.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  resolvedData!: CustomResponseDto<UserDto>;
  accountForm!: FormGroup;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _fb Fb.
   * @param _modalHelperService ModalHelperService.
   * @param _userService MyAccountService.
   * @param _jwtHelperService JwtHelperService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _modalHelperService: ModalHelperService,
    private _userService: UserService,
    private _jwtHelperService: JwtHelperService,
    private _toastService: ToastService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
    });
  }
  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this.accountForm = this._fb.group({
      firstName: [this.resolvedData.data!.firstName, Validators.required],
      lastName: [this.resolvedData.data!.lastName, Validators.required],
      email: [this.resolvedData.data!.email, [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * UpdateUser.
   */
  public updateUser(): void {
    const formValueWithId = { ...this.accountForm.value, id: this._jwtHelperService.decodeToken()?.userId };

    this._userService.updateUser(formValueWithId).subscribe(() => {
      this._toastService.show('User Updated');
    });
  }

  /**
   * OnReset.
   */
  public onReset(): void {
    this.accountForm.reset();

    this._toastService.show('Form Reseted');
  }

  /**
   * OnSubmit.
   */
  public async deleteUser(): Promise<void> {
    const deleteUserStatus = await this._modalHelperService.openModal('Delete User', 'Are you sure you want to delete the user?');
    if (deleteUserStatus) {
      this._userService.deleteYourOwnUserById().subscribe(() => {
        this._toastService.show('User Deleted');
      });
    }
  }
}
