import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { OrdersComponent } from './orders.component';
import { OrdersDataResolverService } from './service/orders-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.orderProduct,
    component: OrdersComponent,
    // canActivate: [AuthGuardService],
    // resolve: { resolvedData: OrdersDataResolverService },
    title: 'Add Product'
  }
];

export const ordersRoutes = RouterModule.forChild(routes);
