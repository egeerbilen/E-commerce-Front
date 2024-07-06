import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [SharedModule, RouterModule, CommonModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {}
