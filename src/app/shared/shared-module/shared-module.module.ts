import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ByteToImagePipe } from 'src/app/helpers/img-helper/byte-to-image.pipe';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';

import { httpInterceptorProvider, jwtModule } from '../jwt/jwt-token-module-settings';
import { storeModules } from '../ng-rx/reducers';
import { LoadingService } from '../services/loading/loading.service';
@NgModule({
  imports: [storeModules, jwtModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [ByteToImagePipe, ModalHelperComponent],
  providers: [httpInterceptorProvider, LoadingService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, ByteToImagePipe, ModalHelperComponent]
})
export class SharedModule {}
