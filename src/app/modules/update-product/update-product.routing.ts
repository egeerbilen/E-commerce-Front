import { RouterModule, Routes } from '@angular/router';

import { UpdateProductDataResolverService } from './service/update-product-data-resolver.service';
import { UpdateProductComponent } from './update-product.component';

const routes: Routes = [
  {
    path: 'UpdateProduct/:id',
    component: UpdateProductComponent,
    title: 'Update Product',
    resolve: { resolvedData: UpdateProductDataResolverService }
  }
];

export const updateProductRoutes = RouterModule.forChild(routes);
