import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

import { MyAccountService } from './service/my-account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  resolvedData!: CustomResponseDto<UserDto>;
  accountForm!: FormGroup;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _fb Fb.
   * @param _modalHelperService ModalHelperService.
   * @param _myAccountService MyAccountService.
   * @param _localStorageService LocalStorageService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _modalHelperService: ModalHelperService,
    private _myAccountService: MyAccountService,
    private _localStorageService: LocalStorageService,
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
      firstName: [this.resolvedData.data.firstName, Validators.required],
      lastName: [this.resolvedData.data.lastName, Validators.required],
      email: [this.resolvedData.data.email, [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * UpdateUser.
   */
  public updateUser(): void {
    const formValueWithId = { ...this.accountForm.value, id: this._localStorageService.decodeToken()?.userId };
    this._toastService.show('User Updated');
    this._myAccountService.updateUser(formValueWithId).subscribe();
  }

  /**
   * OnReset.
   */
  public onReset(): void {
    this._toastService.show('Form Reseted');
    this.accountForm.reset();
  }

  /**
   * OnSubmit.
   */
  public async deleteUser(): Promise<void> {
    const deleteUserStatus = await this._modalHelperService.openModal('Delete User', 'Are you sure you want to delete the user?');
    if (deleteUserStatus) {
      console.log('Delete User');
    }
  }
}
