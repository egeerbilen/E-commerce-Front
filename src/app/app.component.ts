import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignalrService } from './helpers/signalr/signalr.service';
import { ToastService } from './helpers/toast/toast.service';
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
   * @param _userLocalStorageService LocalStorageService.
   * @param _store Store.
   * @param _signalrService SignalrService.
   * @param _toastService ToastService.
   */
  constructor(
    private _userLocalStorageService: UserLocalStorageService,
    private _store: Store,
    private _signalrService: SignalrService,
    private _toastService: ToastService
  ) {
    const token = this._userLocalStorageService.getDecodedToken();

    if (!token) {
      this._store.dispatch(setUserData({ userData: token }));
    }

    this._signalrService.addReceiveMessageListener((user, message) => {
      const mes = user + ': ' + message;
      this._toastService.show(mes);
    });
  }
}
