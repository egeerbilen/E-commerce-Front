import { Component, OnInit } from '@angular/core';

import { ModalService } from './service/modal-service.service';

@Component({
  selector: 'app-modal-helper',
  templateUrl: './modal-helper.component.html',
  styleUrls: ['./modal-helper.component.css']
})
export class ModalHelperComponent implements OnInit {
  isOpen = false;
  title = '';
  content = '';

  /**
   * Constructor.
   * @param _modalService ModalService.
   */
  constructor(private _modalService: ModalService) {}

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
    this._modalService.closeModal();
  }
}
