import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule {}
