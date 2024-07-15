import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { BasketsComponent } from './baskets.component';
import { BasketDataResolverService } from './service/basket-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.basket,
    component: BasketsComponent,
    title: 'Basket',
    resolve: { resolvedData: BasketDataResolverService }
  }
];

export const basketsRoutes = RouterModule.forChild(routes);
