import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { CategoryManagementComponent } from './category-management.component';
import { categoryManagementRoutes } from './category-management.routing';

@NgModule({
  imports: [categoryManagementRoutes, CommonModule, SharedModule],
  declarations: [CategoryManagementComponent]
})
export class CategoryManagementModule {}
