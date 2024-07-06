import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { setUserData } from './shared/ng-rx/actions/user.actions';
import { getUserData } from './shared/ng-rx/selectors/user.selectors';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';

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
    private _localStorageService: LocalStorageService,
    private _store: Store
  ) {
    const token = this._localStorageService.getDecodedToken();
    console.log(token);

    if (!token) {
      this._store.dispatch(setUserData({ userData: token }));
      // this._store.select(getUserData).subscribe((res) => {
      //   this.user = res;
      //   console.log(res);
      // });
    }
  }
}
