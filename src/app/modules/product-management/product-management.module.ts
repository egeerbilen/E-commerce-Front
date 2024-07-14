import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { AddProductModule } from './add-product/add-product.module';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { CategoryManagementModule } from './category-management/category-management.module';
import { OrdersModule } from './orders/orders.module';
import { ProductManagementComponent } from './product-management.component';
import { productManagement } from './product-management.routing';
import { UpdateProductModule } from './update-product/update-product.module';

@NgModule({
  imports: [productManagement, CategoryManagementModule, AddProductModule, UpdateProductModule, CommonModule, OrdersModule, SharedModule],
  declarations: [ProductManagementComponent, CategoryFilterComponent],
  exports: [RouterModule]
})
export class ProductManagementModule {}
