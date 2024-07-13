import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { ProductManagementComponent } from './product-management.component';
import { ProductManagementDataResolveService } from './service/product-management-data-resolve.service';

const routes: Routes = [
  {
    path: urlEnums.productManagement,
    component: ProductManagementComponent,
    title: 'Product Management',
    resolve: { resolvedData: ProductManagementDataResolveService }
  }
];

export const productManagement = RouterModule.forChild(routes);
