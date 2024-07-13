import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { CategoryManagementComponent } from './category-management.component';
import { CategoryManagementDataResolverService } from './service/category-management-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent,
    title: 'Category Management',
    canActivate: [AuthGuardService],
    resolve: { resolvedData: CategoryManagementDataResolverService }
  }
];

export const categoryManagementRoutes = RouterModule.forChild(routes);
