import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { ProductDetailsComponent } from './product-details.component';
import { productDetailsRoutes } from './product-details.routing';

@NgModule({
  imports: [productDetailsRoutes, CommonModule, SharedModule],
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule {}
