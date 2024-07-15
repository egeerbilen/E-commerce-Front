import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { MyAccountComponent } from './my-account.component';
import { MyAccountDataResolverService } from './service/my-account-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.myAccount,
    component: MyAccountComponent,
    title: 'My Account',
    canActivate: [AuthGuardService],
    resolve: { resolvedData: MyAccountDataResolverService }
  }
];

export const myAccountRoutes = RouterModule.forChild(routes);
