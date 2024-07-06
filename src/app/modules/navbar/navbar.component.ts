import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';
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
  tokenStatus = true;

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
      if (Object.keys(res).length > 0) {
        this.tokenStatus = true;
      }
    });
  }

  /**
   * Logout.
   */
  public logout(): void {
    console.log('-----------');
    this._modalService.openModal('Modal Title', 'This is the modal ddddddddddddcontent.');

    // this._router.navigate(['/']);
    // this._localStorageService.removeToken();
    // this._store.dispatch(setUserData({ userData: {} }));
    // this.tokenStatus = false;
  }
}
