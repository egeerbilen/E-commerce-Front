import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ByteToImagePipe } from 'src/app/helpers/byte-to-image.pipe';

import { httpInterceptorProvider, jwtModule } from '../jwt/jwt-token-module-settings';
import { LoadingService } from '../services/loading/loading.service';
@NgModule({
  declarations: [ByteToImagePipe],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, jwtModule],
  providers: [httpInterceptorProvider, LoadingService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, ByteToImagePipe]
})
export class SharedModule {}
