import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ModalHelperService } from './service/modal-helper-service.service';

@Component({
  selector: 'app-modal-helper',
  templateUrl: './modal-helper.component.html',
  styleUrls: ['./modal-helper.component.css']
})
export class ModalHelperComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOk = new EventEmitter<void>();
  isOpen = false;
  title = '';
  content = '';

  /**
   * Constructor.
   * @param _modalService ModalService.
   */
  constructor(private _modalService: ModalHelperService) {}

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._modalService.modalState$.subscribe((state: any) => {
      this.isOpen = state.isOpen;
      this.title = state.title;
      this.content = state.content;
    });
  }

  /**
   * CloseModal.
   */
  public closeModal(): void {
    this.onClose.emit();
  }

  /**
   * CloseModal.
   */
  public okModal(): void {
    this.onOk.emit();
  }
}
