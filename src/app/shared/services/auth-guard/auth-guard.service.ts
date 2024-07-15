import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { ToastService } from 'src/app/helpers/toast/toast.service';

import { UserLocalStorageService } from '../local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  /**
   * Constructor.
   * @param _router Router.
   * @param _userLocalStorageService UserLocalStorageService.
   * @param _toastService ToastService.
   */
  constructor(
    private _router: Router,
    private _userLocalStorageService: UserLocalStorageService,
    private _toastService: ToastService
  ) {}

  /**
   * The canActivate function checks if the user has the required authorization to access a specific
   * route and either grants access or redirects to an unauthorized page.
   * @param next - The next parameter represents the next state of the route,
   * while the state parameter represents the current state of the route.
   * @param state - The `state` parameter represents the current state of the
   * router, including the URL and any query parameters. It is of type `RouterStateSnapshot`.
   * @returns The canActivate method returns either a boolean value, a UrlTree object, or an Observable
   * or Promise that resolves to a boolean value or UrlTree object.
   */
  public canActivate(
    // Örneğin, next parametresi, rotanın bir sonraki durumunu temsil eder. state ise rotanın anlık durumunu yansıtır.
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('🚀 ~ AuthGuardService ~ canActivate:', 'canActivate');
    const decodedToken = this._userLocalStorageService.getDecodedToken();
    console.log(decodedToken);
    const isAdmin = decodedToken?.roles?.includes('Admin');
    const isSuperUser = decodedToken?.roles?.includes('SuperUser');
    const canCreate = decodedToken?.roles?.includes('Create');
    const canUpdate = decodedToken?.roles?.includes('Update');
    const canRead = decodedToken?.roles?.includes('Read');
    const canDelete = decodedToken?.roles?.includes('Delete');
    const isUser = decodedToken?.roles?.includes('User');

    console.log(state.url);
    if (state.url === '/' + urlEnums.login && !decodedToken) {
      return true;
    }

    if (state.url === '/' + urlEnums.myAccount && decodedToken) {
      return true;
    }

    if (
      state.url === '/' + urlEnums.productManagement + '/' + urlEnums.updateProduct + '/' + next.params['id'] &&
      (isSuperUser || (isAdmin && canUpdate))
    ) {
      return true;
    }

    if (state.url === '/' + urlEnums.productManagement + '/' + urlEnums.addProduct && (isSuperUser || (isAdmin && canCreate))) {
      return true;
    }

    if (state.url === '/' + urlEnums.productManagement + '/' + urlEnums.categoryManagement && isSuperUser) {
      return true;
    }

    if (state.url === '/' + urlEnums.orderProduct && (isSuperUser || isAdmin)) {
      return true;
    }

    if (state.url === '/' + urlEnums.productManagement && (isSuperUser || isAdmin)) {
      return true;
    }

    this._toastService.show('Related url access denied.');
    return false;
    // return this._router.navigate([urlEnums.notFoundPage]);
  }

  /**
   * The `canActivateChild` function returns the result of the `canActivate` function.
   * @param childRoute - The childRoute parameter is an ActivatedRouteSnapshot
   * object that represents the route that is being activated for a child component. It contains
   * information about the route, such as the URL segments, route parameters, and query parameters.
   * @param state - The `state` parameter in the `canActivateChild` method is of
   * type `RouterStateSnapshot`. It represents the state of the router at the time the guard is called.
   * It contains information about the current URL, query parameters, and other relevant data.
   * @returns The `canActivateChild` method is returning the result of the `canActivate` method.
   */
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
