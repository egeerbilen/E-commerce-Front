import { Component } from '@angular/core';

import { LoadingPageService } from './loading-page.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent {
  loading$ = this._loadingPageService.loading$;

  /**
   * Constructor.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(private _loadingPageService: LoadingPageService) {}
}
