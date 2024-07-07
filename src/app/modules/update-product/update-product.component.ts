import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';

import { UpdateServiceService } from './service/update-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  resolvedData!: CustomResponseDto<ProductDto>;
  product!: ProductDto;
  productForm!: FormGroup;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _route ActivatedRoute.
   * @param _updateServiceService UpdateServiceService.
   */
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _updateServiceService: UpdateServiceService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      if (this.resolvedData.data) {
        this.product = this.resolvedData.data;
      }
    });
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this.productForm = this._fb.group({
      id: [this.product.id, Validators.required],
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      categoryId: [1, Validators.required],
      productDetails: this._fb.group({
        description: [this.product.productDetails.description, Validators.required],
        stock: [this.product.productDetails.stock, Validators.required]
      })
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this._updateServiceService.updateProduct(this.productForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
