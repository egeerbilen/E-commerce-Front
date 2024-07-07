import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  /**
   * Constructor.
   * @param _loginService Login service.
   * @param _cookieService Cookie service.
   */
  constructor(
    private _loginService: LocalStorageService,
    private _cookieService: CookieService
  ) {}
  // Daha sonra bu interceptor'ı AppModule'unuzda veya bir servis modülünde kullanmanız gerekiyor.
  // Bunun için, Angular'un HTTP_INTERCEPTORS token'ını kullanarak interceptor'ı provide etmeniz gerekiyor:
  // TODO make Enum for apiUrl

  /**
   * Intercept.
   * @param request Request.
   * @param next Next.
   * @returns Http evnt.
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ! Burası HTTP isteği yakalandığında çalışacak yer Her istek giderken buraya girecek imp edilsede edilmesede
    // Request manipülasyonları burada yapılabilir

    const modifiedRequest = request.clone({
      setHeaders: {
        authorization: this._loginService.getToken() || '' // Set Authorization header
        // Cookie başlığını eklemeye gerek yok, tarayıcı bunu zaten ekler json server desteklemediğinden cookileri gönderemeyiz
      }
    });

    // sadece next.handle(modifiedRequest) diyerek de devam edebilirdik
    return next.handle(modifiedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
