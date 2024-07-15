import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { ProductDetailsComponent } from './product-details.component';
import { ProductDatailsDataResolverService } from './service/product-datails-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.productDetails + '/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
    resolve: { resolvedData: ProductDatailsDataResolverService }
  }
];

export const productDetailsRoutes = RouterModule.forChild(routes);
