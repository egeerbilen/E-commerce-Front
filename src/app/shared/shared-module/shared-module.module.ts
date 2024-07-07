import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ByteToImagePipe } from 'src/app/helpers/img-helper/byte-to-image.pipe';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';
import { ToastService } from 'src/app/helpers/toast/toast.service';

import { httpInterceptorProvider, jwtModule } from '../jwt/jwt-token-module-settings';
import { storeModules } from '../ng-rx/reducers';
import { LoadingService } from '../services/loading/loading.service';
@NgModule({
  imports: [
    storeModules,
    jwtModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  declarations: [ByteToImagePipe, ModalHelperComponent],
  providers: [httpInterceptorProvider, LoadingService, ToastService],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ByteToImagePipe,
    ModalHelperComponent,
    MatSnackBarModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {}
