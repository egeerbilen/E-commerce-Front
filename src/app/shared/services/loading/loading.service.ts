import { Injectable } from '@angular/core';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = false;

  /**
   * Show.
   */
  public show(): void {
    this.isLoading = true;
  }

  /**
   * Hide.
   */
  public hide(): void {
    this.isLoading = false;
  }
}
