import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { setUserData } from '../../ng-rx/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // * Token ları zaten back-end de de kontrol edeceksin
  private _token = '';
  private _decodedToken: object;

  /**
   * Constructor.
   * @param _jwtHelperService JwtHelperService.
   * @param _store Store.
   */
  constructor(
    private _jwtHelperService: JwtHelperService,
    private _store: Store
  ) {
    this._token = localStorage.getItem('bearer_token') ?? ''; // || null undefined veya boş geldiği zaman sağ tarafı değer atayacak
    this._decodedToken = this.decodeToken();
    this._store.dispatch(setUserData({ userData: this._decodedToken }));
  }

  /**
   * IsLogin.
   * @returns Token.
   */
  public isLogin(): string {
    return this._token;
  }

  /**
   * Set Token.
   * @param token Token.
   */
  public setToken(token: string): void {
    localStorage.setItem('bearer_token', token);
    this._token = token;
    this._decodedToken = this.decodeToken();
    this._store.dispatch(setUserData({ userData: this._decodedToken }));
    console.log('Login olundu');
  }

  /**
   * RemoveToken.
   */
  public removeToken(): void {
    localStorage.removeItem('bearer_token');
    this._token = '';
    console.log("Token localStorage'dan silindi");
  }

  /**
   * GetToken.
   * @returns Token.
   */
  public getToken(): string {
    return this._token;
  }

  /**
   * DecodeToken.
   * @returns Object.
   */
  public decodeToken(): object {
    return this._jwtHelperService.decodeToken(this._token) ?? {};
  }
}
