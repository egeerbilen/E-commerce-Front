import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { apiEndpoint } from '../enviroments/api-endpoint';
import { ApiHelperService } from './api-helper/api-helper.service';
import { UserLocalStorageService } from './local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  urlEnums;
  apiEndpoint;

  /**
   * Constructor.
   * @param http Http Request Service.
   * @param router Route to url.
   * @param userLocalStorageService UserLocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    protected router: Router,
    protected userLocalStorageService: UserLocalStorageService
  ) {
    this.urlEnums = urlEnums;
    this.apiEndpoint = apiEndpoint;
  }
}
