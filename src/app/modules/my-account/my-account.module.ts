import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { MyAccountComponent } from './my-account.component';
import { myAccountRoutes } from './my-account.routing';

@NgModule({
  imports: [myAccountRoutes, CommonModule, SharedModule],
  declarations: [MyAccountComponent]
})
export class MyAccountModule {}
