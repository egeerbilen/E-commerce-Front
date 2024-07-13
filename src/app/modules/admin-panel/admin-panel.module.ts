import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { AddProductModule } from '../product-management/add-product/add-product.module';
import { CategoryManagementModule } from '../product-management/category-management/category-management.module';
import { UpdateProductModule } from '../product-management/update-product/update-product.module';
import { AdminPanelComponent } from './admin-panel.component';
import { adminPanelRoutes } from './admin-panel.routing';

@NgModule({
  imports: [adminPanelRoutes, CommonModule, SharedModule, AddProductModule, CategoryManagementModule, UpdateProductModule],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule {}
