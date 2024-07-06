import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  /**
   * Constructor.
   * @param _fb Fb.
   * @param _loginService LoginService.
   * @param _localStorageService LocalStorageService.
   * @param _router Router.
   */
  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _localStorageService: LocalStorageService,
    private _router: Router
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
        this._localStorageService.setToken(res.data);
        this._router.navigate(['/']);
      });
    }
  }
}
