import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { AdminPanelComponent } from './admin-panel.component';
import { adminPanelRoutes } from './admin-panel.routing';
import { CategoryFilterComponent } from './category-filter/category-filter.component';

@NgModule({
  imports: [adminPanelRoutes, CommonModule, SharedModule],
  declarations: [AdminPanelComponent, CategoryFilterComponent]
})
export class AdminPanelModule {}
