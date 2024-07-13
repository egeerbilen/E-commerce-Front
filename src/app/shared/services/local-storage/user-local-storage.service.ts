import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { DecodedTokenWithJwtDto } from '../../dto/decoded-token-with-jwt-dto';
import { setUserData } from '../../ng-rx/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserLocalStorageService {
  private _userId = 0;
  private _token = '';
  private _decodedToken: DecodedTokenWithJwtDto | null;

  /**
   * Constructor.
   * @param _jwtHelperService JwtHelperService.
   * @param _store Store.
   */
  constructor(
    private _jwtHelperService: JwtHelperService,
    private _store: Store
  ) {
    this._token = localStorage.getItem('bearer_token') ?? '';
    this._decodedToken = this._jwtHelperService.decodeToken(this._token);
    if (this._decodedToken) {
      this._userId = this._decodedToken.userId;
      this._decodedToken.jwt = this._token;
      this._store.dispatch(setUserData({ userData: this._decodedToken }));
    } else {
      this._store.dispatch(setUserData({ userData: null }));
    }
  }

  /**
   * IsLogin.
   * @returns String.
   */
  public isLogin(): string {
    return this._token;
  }

  /**
   * SetToken.
   * @param token Token.
   */
  public setToken(token: string): void {
    localStorage.setItem('bearer_token', token);
    this._decodedToken = this._jwtHelperService.decodeToken(token);
    if (this._decodedToken) {
      this._userId = this._decodedToken.userId;
      this._store.dispatch(setUserData({ userData: this._decodedToken }));
    } else {
      this._store.dispatch(setUserData({ userData: null }));
    }
  }

  /**
   * RemoveToken.
   */
  public removeToken(): void {
    localStorage.removeItem('bearer_token');
    this._token = '';
    this._decodedToken = null;
    this._userId = 0;
  }

  /**
   * GetToken.
   * @returns String.
   */
  public getToken(): string {
    return this._token;
  }

  /**
   * GetDecodedToken.
   * @returns DecodedTokenDto or null.
   */
  public getDecodedToken(): DecodedTokenWithJwtDto | null {
    return this._decodedToken;
  }

  /**
   * GetUserId.
   * @returns Number.
   */
  public getUserId(): number {
    return this._userId;
  }
}
