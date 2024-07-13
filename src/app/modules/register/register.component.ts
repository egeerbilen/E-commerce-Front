import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  urlEnums;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _registerService RegisterService.
   * @param _router Router.
   */
  constructor(
    private _fb: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router
  ) {
    this.urlEnums = urlEnums;
    this.registerForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.registerForm.valid) {
      this._registerService.userCreate(this.registerForm.value).subscribe((res) => {
        if (res) {
          this._router.navigate([this.urlEnums.login]);
        }
      });
    }
  }
}
