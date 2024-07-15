/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { AdminPanelDataResolverService } from './admin-panel-data-resolver.service';

describe('Service: AdminPanelDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPanelDataResolverService]
    });
  });

  it('should ...', inject([AdminPanelDataResolverService], (service: AdminPanelDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
