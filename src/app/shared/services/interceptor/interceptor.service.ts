import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { LoadingPageService } from '../loading-page/loading-page.service';
import { UserLocalStorageService } from '../local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  /**
   * Constructor.
   * @param _loginService Login service.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _loginService: UserLocalStorageService,
    private _loadingPageService: LoadingPageService
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
    this._loadingPageService.show();
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
        // İstek tamamlandığında veya hata oluştuğunda yükleme durumunu kapat
        this._loadingPageService.hide();
      })
    );
  }
}
