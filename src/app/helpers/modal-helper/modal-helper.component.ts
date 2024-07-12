import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-helper',
  templateUrl: './modal-helper.component.html',
  styleUrls: ['./modal-helper.component.css']
})
export class ModalHelperComponent {
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public dialogRef: MatDialogRef<ModalHelperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}

  /**
   * OnCloseClick.
   */
  public onCloseClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * OnOkClick.
   */
  public onOkClick(): void {
    this.dialogRef.close(true);
  }
}
