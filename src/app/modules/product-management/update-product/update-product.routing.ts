import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { UpdateProductDataResolverService } from './service/update-product-data-resolver.service';
import { UpdateProductComponent } from './update-product.component';

const routes: Routes = [
  {
    path: 'UpdateProduct/:id',
    component: UpdateProductComponent,
    title: 'Update Product',
    canActivate: [AuthGuardService],
    resolve: { resolvedData: UpdateProductDataResolverService }
  }
];

export const updateProductRoutes = RouterModule.forChild(routes);
