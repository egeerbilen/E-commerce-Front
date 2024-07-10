import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { BasketsComponent } from './baskets.component';
import { BasketDataResolverService } from './service/basket-data-resolver.service';

const routes: Routes = [
  {
    path: 'Basket',
    component: BasketsComponent,
    title: 'Basket',
    canActivate: [AuthGuardService],
    resolve: { resolvedData: BasketDataResolverService }
  }
];

export const basketsRoutes = RouterModule.forChild(routes);
