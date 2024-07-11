import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { ProductUpdateDto } from 'src/app/shared/dto/product-update-dto';

import { UpdateProductService } from './service/update-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  resolvedProductData!: CustomResponseDto<ProductDto>;
  resolvedCategoryData!: CustomResponseDto<CategoryDto[]>;
  product!: ProductDto;
  productForm!: FormGroup;
  categories: CategoryDto[] = [];

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _route ActivatedRoute.
   * @param _updateServiceService UpdateServiceService.
   * @param _toastService Toast.
   */
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _updateServiceService: UpdateProductService,
    private _toastService: ToastService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedProductData = data['resolvedData'].product;
      this.resolvedCategoryData = data['resolvedData'].categories;
      if (this.resolvedProductData.data) {
        this.product = this.resolvedProductData.data;
      }
      if (this.resolvedCategoryData.data) {
        this.categories = this.resolvedCategoryData.data;
      }
    });
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this.productForm = this._fb.group({
      name: [this.product.name, [Validators.required, Validators.maxLength(200)]],
      price: [this.product.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      categoryId: [this.product.categoryId, Validators.required],
      description: [this.product.description, Validators.maxLength(500)],
      stock: [this.product.stock, Validators.required],
      imageData: [null]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.productForm.valid) {
      const formDataWithUserId: ProductUpdateDto = {
        ...this.productForm.value,
        id: this.product.id,
        userId: this.product.userId
      };
      this._updateServiceService.updateProduct(formDataWithUserId).subscribe(() => {
        this._toastService.show('Data is updated');
      });
    }
  }

  /**
   * OnFileChange.
   * @param event Event.
   */
  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productForm.patchValue({
          imageData: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
