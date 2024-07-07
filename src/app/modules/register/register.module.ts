import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { RegisterComponent } from './register.component';
import { registerRoutes } from './register.routing';

@NgModule({
  imports: [registerRoutes, CommonModule, SharedModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
