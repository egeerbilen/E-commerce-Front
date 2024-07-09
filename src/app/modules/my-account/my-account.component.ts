import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { MyAccountService } from './service/my-account.service';

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
   * @param _myAccountService MyAccountService.
   * @param _jwtHelperService JwtHelperService.
   * @param _toastService ToastService.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _modalHelperService: ModalHelperService,
    private _myAccountService: MyAccountService,
    private _jwtHelperService: JwtHelperService,
    private _toastService: ToastService,
    private _loadingPageService: LoadingPageService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
    });
  }
  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._loadingPageService.show();
    this.accountForm = this._fb.group({
      firstName: [this.resolvedData.data!.firstName, Validators.required],
      lastName: [this.resolvedData.data!.lastName, Validators.required],
      email: [this.resolvedData.data!.email, [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(3)]]
    });
    this._loadingPageService.hide();
  }

  /**
   * UpdateUser.
   */
  public updateUser(): void {
    this._loadingPageService.show();
    const formValueWithId = { ...this.accountForm.value, id: this._jwtHelperService.decodeToken()?.userId };
    this._toastService.show('User Updated');
    this._myAccountService.updateUser(formValueWithId).subscribe();
    this._loadingPageService.hide();
  }

  /**
   * OnReset.
   */
  public onReset(): void {
    this._loadingPageService.show();
    this._toastService.show('Form Reseted');
    this.accountForm.reset();
    this._loadingPageService.hide();
  }

  /**
   * OnSubmit.
   */
  public async deleteUser(): Promise<void> {
    this._loadingPageService.show();
    const deleteUserStatus = await this._modalHelperService.openModal('Delete User', 'Are you sure you want to delete the user?');
    if (deleteUserStatus) {
      console.log('Delete User');
    }
    this._loadingPageService.hide();
  }
}
