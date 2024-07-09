import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { setUserData } from 'src/app/shared/ng-rx/actions/user.actions';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

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
   * @param _userLocalStorageService LocalStorageService.
   * @param _router Router.
   * @param _jwtHelperService JwtHelperService.
   * @param _store Store.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _userLocalStorageService: UserLocalStorageService,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _store: Store,
    private _loadingPageService: LoadingPageService
  ) {
    this.loginForm = this._fb.group({
      email: ['ege.erbilen@example.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    this._loadingPageService.show();
    if (this.loginForm.valid) {
      this._loginService.userLogin(this.loginForm.value).subscribe((res) => {
        const token = res.data;
        if (token) {
          this._userLocalStorageService.setToken(token);
          this._store.dispatch(setUserData({ userData: this._jwtHelperService.decodeToken(token) }));
          this._router.navigate(['/']);
        }
      });
    }
    this._loadingPageService.hide();
  }
  /**
   * OnRegister.
   */
  public onRegister(): void {
    this._router.navigate(['/Register']);
  }
}
