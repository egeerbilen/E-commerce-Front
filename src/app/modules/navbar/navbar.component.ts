import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/helpers/modal-helper/service/modal-service.service';
import { setUserData } from 'src/app/shared/ng-rx/actions/user.actions';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

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
   * @param _modalService ModalService.
   */
  constructor(
    private _store: Store,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _modalService: ModalService
  ) {
    this._store.select(getUserData).subscribe((res) => {
      console.log(res);
      if (res) {
        this.tokenStatus = true;
      }
    });
  }

  /**
   * Logout.
   */
  public logout(): void {
    this._modalService.openModal('Login Status', 'Successfully logged out.');

    this._router.navigate(['/']);
    this._localStorageService.removeToken();
    this._store.dispatch(setUserData({ userData: null }));
    this.tokenStatus = false;
  }
}
