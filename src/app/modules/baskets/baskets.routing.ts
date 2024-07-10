import { RouterModule, Routes } from '@angular/router';

import { BasketsComponent } from './baskets.component';
import { BasketDataResolverService } from './service/basket-data-resolver.service';

const routes: Routes = [
  {
    path: 'Basket',
    component: BasketsComponent,
    title: 'Basket',
    resolve: { resolvedData: BasketDataResolverService }
  }
];

export const basketsRoutes = RouterModule.forChild(routes);
