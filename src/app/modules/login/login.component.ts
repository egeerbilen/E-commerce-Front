import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { setUserData } from 'src/app/shared/ng-rx/actions/user.actions';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  userInformationResponseError: string[] | null = null;
  urlEnums;

  /**
   * Constructor.
   * @param _fb Fb.
   * @param _userService LoginService.
   * @param _userLocalStorageService LocalStorageService.
   * @param _router Router.
   * @param _jwtHelperService JwtHelperService.
   * @param _store Store.
   */
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _userLocalStorageService: UserLocalStorageService,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _store: Store
  ) {
    this.urlEnums = urlEnums;
    this.loginForm = this._fb.group({
      email: ['ege.erbilen@example.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      this._userService.userLogin(this.loginForm.value).subscribe((res) => {
        if (res.data) {
          this._userLocalStorageService.setToken(res.data);
          const decodedToken = this._jwtHelperService.decodeToken(res.data);
          decodedToken.jwt = res.data;
          this._store.dispatch(setUserData({ userData: decodedToken }));
          this._router.navigate(['/']);
        } else {
          this.userInformationResponseError = res.errors;
        }
      });
    }
  }

  /**
   * OnRegister.
   */
  public onRegister(): void {
    this._router.navigate([this.urlEnums.register]);
  }
}
