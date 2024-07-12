import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { AddCategoryComponent } from './add-category.component';
import { addCategoryRoutes } from './add-category.routing';

@NgModule({
  imports: [addCategoryRoutes, CommonModule, SharedModule],
  declarations: [AddCategoryComponent]
})
export class AddCategoryModule {}
