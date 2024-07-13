import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { AddProductComponent } from './add-product.component';
import { addProductRoutes } from './add-product.routing';

@NgModule({
  imports: [addProductRoutes, CommonModule, SharedModule],
  declarations: [AddProductComponent]
})
export class AddProductModule {}
