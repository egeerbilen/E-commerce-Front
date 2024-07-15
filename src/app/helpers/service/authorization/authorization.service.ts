import { Injectable } from '@angular/core';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _decodedToken: DecodedTokenWithJwtDto | null = null;

  /**
   * Constructor.
   * @param _userLocalStorageService UserLocalStorageService.
   */
  constructor(private _userLocalStorageService: UserLocalStorageService) {
    this._decodedToken = this._userLocalStorageService.getDecodedToken();
  }

  /**
   * HasRole.
   * @param role Role.
   * @returns Boolean.
   */
  public hasRole(role: string): boolean {
    return this._decodedToken?.roles?.includes(role) || false;
  }

  /**
   * GetDecodedToken.
   * @returns Restun.
   */
  public getDecodedToken(): DecodedTokenWithJwtDto | null {
    return this._decodedToken;
  }
}
