/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { ModalServiceService } from './modal-service.service';

describe('Service: ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalServiceService]
    });
  });

  it('should ...', inject([ModalServiceService], (service: ModalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
