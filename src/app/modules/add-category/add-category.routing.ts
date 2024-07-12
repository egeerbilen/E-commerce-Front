import { RouterModule, Routes } from '@angular/router';

import { AddCategoryComponent } from './add-category.component';
import { AddCategoryDataResolverService } from './service/add-category-data-resolver.service';

const routes: Routes = [
  {
    path: 'AddCategory',
    component: AddCategoryComponent,
    title: 'Add Category',
    resolve: { resolvedData: AddCategoryDataResolverService }
  }
];

export const addCategoryRoutes = RouterModule.forChild(routes);
