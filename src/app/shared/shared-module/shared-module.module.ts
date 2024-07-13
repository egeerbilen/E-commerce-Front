import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FindProductPipe } from 'src/app/helpers/find-product/find-product.pipe';
import { HighlightCategoryDirective } from 'src/app/helpers/highlight-category/highlight-category.directive';
import { ByteToImagePipe } from 'src/app/helpers/img-helper/byte-to-image.pipe';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';
import { ToastService } from 'src/app/helpers/toast/toast.service';

import { httpInterceptorProvider } from '../jwt/jwt-token-module-settings';
import { storeModules } from '../ng-rx/reducers';
import { LoadingPageComponent } from '../services/loading-page/loading-page.component';
import { LoadingPageService } from '../services/loading-page/loading-page.service';
@NgModule({
  imports: [
    storeModules,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatMenuModule,
    MatOptionModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule
  ],
  declarations: [LoadingPageComponent, ByteToImagePipe, ModalHelperComponent, HighlightCategoryDirective, FindProductPipe],
  providers: [httpInterceptorProvider, LoadingPageService, ToastService],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    FindProductPipe,
    MatMenuModule,
    MatGridListModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDialogModule,
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
    HighlightCategoryDirective
  ]
})
export class SharedModule {}
