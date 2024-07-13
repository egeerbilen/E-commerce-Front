import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { getUserData } from '../../ng-rx/selectors/user.selectors';
import { LoadingPageService } from '../loading-page/loading-page.service';
import { UserLocalStorageService } from '../local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  /**
   * Constructor.
   * @param _userLocalStorageService UserLocalStorageService.
   * @param _loadingPageService LoadingPageService.
   * @param _store Store.
   */
  constructor(
    private _userLocalStorageService: UserLocalStorageService,
    private _loadingPageService: LoadingPageService,
    private _store: Store
  ) {}

  /**
   * Intercept.
   * @param request Request.
   * @param next Next.
   * @returns Any.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingPageService.show();
    let token = '';
    this._store.select(getUserData).subscribe((res) => {
      console.log(res);
      if (res) {
        token = res.jwt;
        console.log(token);
      }
    });
    let modifiedRequest = request;

    if (token) {
      modifiedRequest = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // İsteğin başarılı olması durumunda yapılacak işlemler
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Hata durumunda yapılacak işlemler
        console.error('Server Error:', error);

        const errorString = error.error;

        const errorsIndex = errorString.indexOf('"Errors":');
        const endIndex = errorString.indexOf(']]"', errorsIndex);
        const errorsPart = errorString.substring(errorsIndex, endIndex + 2);

        console.error(
          '!!! WARNING SERVER ERROR !!! \n --------------------------------------------------------------- \n' +
            errorsPart +
            '\n --------------------------------------------------------------- \n'
        );
        return throwError(error);
      }),
      finalize(() => {
        this._loadingPageService.hide();
      })
    );
  }
}
