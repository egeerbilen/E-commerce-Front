import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _registerService RegisterService.
   * @param _router Router.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _fb: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router,
    private _loadingPageService: LoadingPageService
  ) {
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
    this._loadingPageService.show();
    if (this.registerForm.valid) {
      this._registerService.userCreate(this.registerForm.value).subscribe((res) => {
        if (res) {
          this._router.navigate(['/Login']);
        }
      });
    }
    this._loadingPageService.hide();
  }
}
