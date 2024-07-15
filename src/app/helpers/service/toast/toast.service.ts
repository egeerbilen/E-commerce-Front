import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Constructor.
   * @param _snackBar SnackBar.
   */
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Show.
   * @param message Message.
   * @param action Action.
   * @param duration Duration.
   */
  public show(message: string, action = 'Ok', duration = 3000): void {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
