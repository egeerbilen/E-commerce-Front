import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingPageService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  //BehaviorSubject'ı dışarıya doğrudan açmak, dış bileşenlerin veri akışını kontrol etmesine izin verir.
  loading$ = this._loadingSubject.asObservable();
  // asObservable kullanarak, bu veri akışını sadece okunabilir hale getiririz ve BehaviorSubject'ı değiştirme yetkisini yalnızca servisin kendisine bırakırız.

  /**
   * Show.
   */
  public show(): void {
    this._loadingSubject.next(true);
  }

  /**
   * Hide.
   */
  public hide(): void {
    this._loadingSubject.next(false);
  }
}
