import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { setUserData } from './shared/ng-rx/actions/user.actions';
import { UserLocalStorageService } from './shared/services/local-storage/user-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {};

  /**
   * Constructor.
   * @param _localStorageService LocalStorageService.
   * @param _store Store.
   */
  constructor(
    private _localStorageService: UserLocalStorageService,
    private _store: Store
  ) {
    const token = this._localStorageService.getDecodedToken();

    if (!token) {
      this._store.dispatch(setUserData({ userData: token }));
    }
  }
}
