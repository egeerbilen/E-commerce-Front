import { RouterModule, Routes } from '@angular/router';

import { CategoryManagementComponent } from './category-management.component';
import { CategoryManagementDataResolverService } from './service/category-management-data-resolver.service';

const routes: Routes = [
  {
    path: 'CategoryManagement',
    component: CategoryManagementComponent,
    title: 'Category Management',
    resolve: { resolvedData: CategoryManagementDataResolverService }
  }
];

export const categoryManagementRoutes = RouterModule.forChild(routes);
