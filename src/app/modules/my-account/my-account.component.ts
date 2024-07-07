import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserDto } from 'src/app/shared/dto/user-dto';

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
   */
  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _modalHelperService: ModalHelperService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      console.log(this.resolvedData.data);
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
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      // Burada form verilerini güncelleme işlemi yapılabilir
    }
  }

  /**
   * OnReset.
   */
  public onReset(): void {
    this.accountForm.reset();
  }

  /**
   * OnSubmit.
   */
  public async deleteUser(): Promise<void> {
    const a = await this._modalHelperService.openModal('Delete User', 'Are you sure you want to delete the user?');
    console.log(a);
  }
}
