import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /**
   * Constructor.
   * @param _store Store.
   */
  constructor(private _store: Store) {
    this._store.select(getUserData).subscribe((res) => {
      console.log(res);
    });
  }
}
