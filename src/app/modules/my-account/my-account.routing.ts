import { RouterModule, Routes } from '@angular/router';

import { MyAccountComponent } from './my-account.component';
import { MyAccountService } from './service/my-account.service';

const routes: Routes = [
  {
    path: 'MyAccount',
    component: MyAccountComponent,
    title: 'My Account',
    resolve: { resolvedData: MyAccountService }
  }
];

export const myAccountRoutes = RouterModule.forChild(routes);
