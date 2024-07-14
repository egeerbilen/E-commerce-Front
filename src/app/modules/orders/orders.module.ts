import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { OrdersComponent } from './orders.component';
import { ordersRoutes } from './orders.routing';

@NgModule({
  imports: [ordersRoutes, CommonModule, SharedModule],
  declarations: [OrdersComponent]
})
export class OrdersModule {}
