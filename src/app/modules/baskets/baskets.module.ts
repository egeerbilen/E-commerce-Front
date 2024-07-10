import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { BasketsComponent } from './baskets.component';
import { basketsRoutes } from './baskets.routing';

@NgModule({
  imports: [basketsRoutes, CommonModule, SharedModule],
  declarations: [BasketsComponent]
})
export class BasketsModule {}
