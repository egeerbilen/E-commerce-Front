/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { AdminPanelDataResolveService } from './admin-panel-data-resolve.service';

describe('Service: AdminPanelDataResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPanelDataResolveService]
    });
  });

  it('should ...', inject([AdminPanelDataResolveService], (service: AdminPanelDataResolveService) => {
    expect(service).toBeTruthy();
  }));
});
