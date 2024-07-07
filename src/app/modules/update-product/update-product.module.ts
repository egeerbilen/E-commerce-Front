import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { UpdateProductComponent } from './update-product.component';
import { updateProductRoutes } from './update-product.routing';

@NgModule({
  imports: [updateProductRoutes, CommonModule, SharedModule],
  declarations: [UpdateProductComponent]
})
export class UpdateProductModule {}
