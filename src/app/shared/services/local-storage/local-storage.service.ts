import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { DecodedTokenDto } from '../../dto/decoded-token-dto';
import { setUserData } from '../../ng-rx/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // * Token ları zaten back-end de de kontrol edeceksin
  public userId = 0;
  private _token = '';
  private _decodedToken: DecodedTokenDto | null;

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
    this.userId = this._decodedToken!.userId;
    this._store.dispatch(setUserData({ userData: this._decodedToken ?? null }));
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
    this.userId = this._decodedToken!.userId;
    this._store.dispatch(setUserData({ userData: this._decodedToken ?? null }));
  }

  /**
   * RemoveToken.
   */
  public removeToken(): void {
    localStorage.removeItem('bearer_token');
    this._token = '';
    this._decodedToken = null;
    this.userId = 0;
  }

  /**
   * GetToken.
   * @returns Token.
   */
  public getToken(): string {
    return this._token;
  }

  /**
   * GetToken.
   * @returns Token.
   */
  public getDecodedToken(): DecodedTokenDto | null {
    return this._decodedToken;
  }

  /**
   * DecodeToken.
   * @returns Object.
   */
  public decodeToken(): DecodedTokenDto | null {
    return this._jwtHelperService.decodeToken(this._token) ?? null;
  }

  /**
   * GetToken.
   * @returns Token.
   */
  public getUserId(): number {
    return this.userId;
  }
}
