import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { AddProductComponent } from './add-product.component';
import { AddProductDataResolverService } from './service/add-product-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.addProduct,
    component: AddProductComponent,
    canActivate: [AuthGuardService],
    resolve: { resolvedData: AddProductDataResolverService },
    title: 'Add Product'
  }
];

export const addProductRoutes = RouterModule.forChild(routes);
