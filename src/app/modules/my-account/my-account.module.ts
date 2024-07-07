import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyAccountComponent } from './my-account.component';
import { myAccountRoutes } from './my-account.routing';

@NgModule({
  imports: [myAccountRoutes, CommonModule],
  declarations: [MyAccountComponent]
})
export class MyAccountModule {}
