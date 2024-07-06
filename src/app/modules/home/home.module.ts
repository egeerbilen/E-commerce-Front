import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routing';

@NgModule({
  imports: [homeRoutes, CommonModule, SharedModule],
  declarations: [HomeComponent],
  exports: [RouterModule]
})
export class HomeModule {}
