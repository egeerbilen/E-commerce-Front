import { RouterModule, Routes } from '@angular/router';

import { MyAccountComponent } from './my-account.component';
import { MyAccountDataResolverService } from './service/my-account-data-resolver.service';

const routes: Routes = [
  {
    path: 'MyAccount',
    component: MyAccountComponent,
    title: 'My Account',
    resolve: { resolvedData: MyAccountDataResolverService }
  }
];

export const myAccountRoutes = RouterModule.forChild(routes);
