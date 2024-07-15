import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HighlightCategoryDirective } from 'src/app/helpers/highlight-category-directive/highlight-category.directive';
import { ModalHelperComponent } from 'src/app/helpers/modal-helper/modal-helper.component';
import { FindProductPipe } from 'src/app/helpers/pipe/find-product/find-product.pipe';
import { ByteToImagePipe } from 'src/app/helpers/pipe/img-helper/byte-to-image.pipe';
import { NumberFormatPipe } from 'src/app/helpers/pipe/number-format/number-format.pipe';
import { ToastService } from 'src/app/helpers/service/toast/toast.service';

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
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatOptionModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule
  ],
  declarations: [LoadingPageComponent, ByteToImagePipe, ModalHelperComponent, HighlightCategoryDirective, FindProductPipe, NumberFormatPipe],
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
    NumberFormatPipe,
    ByteToImagePipe,
    MatSortModule,
    MatTableModule,
    MatListModule,
    LoadingPageComponent,
    MatExpansionModule,
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
