import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HighlightCategoryDirective } from 'src/app/helpers/highlight-category/highlight-category.directive';
import { ByteToImagePipe } from 'src/app/helpers/img-helper/byte-to-image.pipe';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';
import { ToastService } from 'src/app/helpers/toast/toast.service';

import { httpInterceptorProvider, jwtModule } from '../jwt/jwt-token-module-settings';
import { storeModules } from '../ng-rx/reducers';
import { LoadingPageComponent } from '../services/loading-page/loading-page.component';
import { LoadingPageService } from '../services/loading-page/loading-page.service';
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
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  declarations: [LoadingPageComponent, ByteToImagePipe, ModalHelperComponent, HighlightCategoryDirective],
  providers: [httpInterceptorProvider, LoadingPageService, ToastService],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    ByteToImagePipe,
    MatListModule,
    LoadingPageComponent,
    ModalHelperComponent,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HighlightCategoryDirective
  ]
})
export class SharedModule {}
