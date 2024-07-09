import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { setUserData } from 'src/app/shared/ng-rx/actions/user.actions';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';
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
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _store: Store,
    private _router: Router,
    private _localStorageService: UserLocalStorageService,
    private _modalHelperService: ModalHelperService,
    private _loadingPageService: LoadingPageService
  ) {
    this._loadingPageService.show();
    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      }
    });
    this._loadingPageService.show();
  }

  /**
   * Logout.
   */
  public async logout(): Promise<void> {
    this._loadingPageService.show();
    const logoutStatus = await this._modalHelperService.openModal('Login Status', 'Successfully logged out.');

    if (logoutStatus) {
      this._router.navigate(['/']);
      this._localStorageService.removeToken();
      this._store.dispatch(setUserData({ userData: null }));
      this.tokenStatus = false;
    }
    this._loadingPageService.hide();
  }
}
