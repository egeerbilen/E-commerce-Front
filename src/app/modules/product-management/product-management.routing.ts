import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { ProductManagementComponent } from './product-management.component';
import { ProductManagementDataResolveService } from './service/product-management-data-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
    pathMatch: 'full',
    title: 'Product Management',
    resolve: { resolvedData: ProductManagementDataResolveService },
    children: [
      {
        pathMatch: 'full',
        path: urlEnums.updateProduct + '/:id',
        loadChildren: () => import('./update-product/update-product.module').then((m) => m.UpdateProductModule)
      },
      {
        pathMatch: 'full',
        path: urlEnums.categoryManagement,
        loadChildren: () => import('./category-management/category-management.module').then((m) => m.CategoryManagementModule)
      },
      {
        pathMatch: 'full',
        path: urlEnums.addProduct,
        loadChildren: () => import('./add-product/add-product.module').then((m) => m.AddProductModule)
      }
    ]
  }
];

export const productManagement = RouterModule.forChild(routes);
