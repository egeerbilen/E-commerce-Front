import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
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
   * @param _snackBar
   */
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _modalHelperService: ModalHelperService,
    private _myAccountService: MyAccountService,
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar
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
    this._myAccountService.updateUser(formValueWithId).subscribe();
  }

  /**
   * OnReset.
   */
  public onReset(): void {
    this.showToast('Form sıfırlandı.');
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

  /**
   * Show Toast Message.
   * @param message Message.
   * @param action Action.
   */
  public showToast(message: string, action = 'Tamam'): void {
    this._snackBar.open(message, action, {
      duration: 3000 // 3 saniye süresince gösterilir
    });
  }
}
