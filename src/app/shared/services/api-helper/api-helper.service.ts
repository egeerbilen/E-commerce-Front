import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environment';

import { CustomResponseDto } from '../../dto/custom-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  private _enviromentBaseApiUrl = environment.apiUrl;

  /**
   * Constructor.
   * @param _http HttpClient.
   */
  constructor(private _http: HttpClient) {}

  /**
   * Generic GET request.
   * @param url Url.
   * @returns T type.
   */
  public get<T>(url: string): Observable<CustomResponseDto<T>> {
    return this._http.get<CustomResponseDto<T>>(this._enviromentBaseApiUrl + url).pipe(catchError(this._handleError));
  }

  /**
   * Generic POST request.
   * @param url Url.
   * @param body Body.
   * @returns T type.
   */
  public post<T>(url: string, body: any): Observable<CustomResponseDto<T>> {
    return this._http.post<CustomResponseDto<T>>(this._enviromentBaseApiUrl + url, body).pipe(catchError(this._handleError));
  }

  /**
   * Generic PUT request.
   * @param url Url.
   * @param body Body.
   * @returns T type.
   */
  public put<T>(url: string, body: any): Observable<CustomResponseDto<T>> {
    return this._http.put<CustomResponseDto<T>>(this._enviromentBaseApiUrl + url, body).pipe(catchError(this._handleError));
  }

  /**
   * Generic DELETE request.
   * @param url Url.
   * @returns T type.
   */
  public delete<T>(url: string): Observable<CustomResponseDto<T>> {
    return this._http.delete<CustomResponseDto<T>>(this._enviromentBaseApiUrl + url).pipe(catchError(this._handleError));
  }

  /**
   * Generic handleError.
   * @param error Error.
   * @returns T type.
   */
  private _handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`API error: ${error.message}`);
    return throwError('An error occurred; please try again later.');
  }
}
