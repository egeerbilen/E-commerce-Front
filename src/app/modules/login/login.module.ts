import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routing';

@NgModule({
  imports: [loginRoutes, SharedModule, CommonModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
