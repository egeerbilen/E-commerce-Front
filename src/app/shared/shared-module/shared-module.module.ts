import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ByteToImagePipe } from 'src/app/helpers/byte-to-image.pipe';

import { LoadingService } from '../services/loading/loading.service';
import { LoggerService } from '../services/logger/logger.service';
@NgModule({
  declarations: [ByteToImagePipe],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [LoggerService, LoadingService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, ByteToImagePipe]
})
export class SharedModule {}
