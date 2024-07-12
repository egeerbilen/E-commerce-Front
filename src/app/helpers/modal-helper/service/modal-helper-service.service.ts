import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalHelperComponent } from '../modal-helper.component';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {
  /**
   * MatDialog.
   * @param _dialog _dialog.
   */
  constructor(private _dialog: MatDialog) {}

  /**
   * OpenModal.
   * @param title Title.
   * @param content Content.
   * @returns Bool.
   */
  public openModal(title: string, content: string): Promise<boolean> {
    const dialogRef = this._dialog.open(ModalHelperComponent, {
      width: '400px',
      data: { title, content }
    });

    return dialogRef.afterClosed().toPromise();
  }
}
