import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { UpdateProductService } from './service/update-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  resolvedData!: CustomResponseDto<ProductDto>;
  product!: ProductDto;
  productForm!: FormGroup;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _route ActivatedRoute.
   * @param _updateServiceService UpdateServiceService.
   * @param _toastService Toast.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _updateServiceService: UpdateProductService,
    private _toastService: ToastService,
    private _loadingPageService: LoadingPageService
  ) {
    this._loadingPageService.show();
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      if (this.resolvedData.data) {
        this.product = this.resolvedData.data;
      }
    });
    this._loadingPageService.hide();
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._loadingPageService.show();
    this.productForm = this._fb.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      categoryId: [1, Validators.required],
      description: [this.product.description, Validators.required],
      stock: [this.product.stock, Validators.required]
    });
    this._loadingPageService.hide();
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    this._loadingPageService.show();
    if (this.productForm.valid) {
      const formDataWithUserId = {
        ...this.productForm.value,
        id: this.product.id,
        userId: this.product.userId
      };
      this._updateServiceService.updateProduct(formDataWithUserId).subscribe((res) => {
        this._toastService.show('Data is updated');
      });
    }
    this._loadingPageService.hide();
  }
}
