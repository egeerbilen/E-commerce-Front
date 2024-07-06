import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // * Token ları zaten back-end de de kontrol edeceksin
  private _token = '';

  /**
   * Constructor.
   */
  constructor() {
    this._token = localStorage.getItem('bearer_token') || ''; // || null undefined veya boş geldiği zaman sağ tarafı değer atayacak
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
   * @returns Token or null.
   */
  public getToken(): string | null {
    return this._token;
  }
}
