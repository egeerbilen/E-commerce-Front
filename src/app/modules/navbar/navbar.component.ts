import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { setUserData } from 'src/app/shared/ng-rx/actions/user.actions';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tokenStatus = false;

  /**
   * Constructor.
   * @param _store Store.
   * @param _router Router.
   * @param _localStorageService LocalStorageService.
   * @param _modalHelperService ModalHelperService.
   */
  constructor(
    private _store: Store,
    private _router: Router,
    private _localStorageService: UserLocalStorageService,
    private _modalHelperService: ModalHelperService
  ) {
    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      }
    });
  }

  /**
   * Logout.
   */
  public async logout(): Promise<void> {
    const logoutStatus = await this._modalHelperService.openModal('Logout', 'Are you sure you want to log out?');

    if (logoutStatus) {
      this._localStorageService.removeToken();
      this._store.dispatch(setUserData({ userData: null }));
      this.tokenStatus = false;
      this._router.navigate(['/']);
    }
  }
}
