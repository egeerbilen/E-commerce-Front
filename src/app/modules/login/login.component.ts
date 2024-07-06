import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  /**
   *Constructor.
   * @param _fb Fb.
   * @param _loginService LoginService.
   */
  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService
  ) {
    this.loginForm = this._fb.group({
      email: ['ege.erbilen@example.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      this._loginService.userLogin(this.loginForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
