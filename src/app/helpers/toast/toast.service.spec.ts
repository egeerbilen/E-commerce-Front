/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('Service: Toast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
