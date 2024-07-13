import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { ProductManagementComponent } from './product-management.component';
import { productManagement } from './product-management.routing';

@NgModule({
  imports: [productManagement, CommonModule, SharedModule],
  declarations: [ProductManagementComponent, CategoryFilterComponent]
})
export class ProductManagementModule {}
