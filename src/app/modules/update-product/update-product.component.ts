import { Component } from '@angular/core';
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
export class UpdateProductComponent {
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
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      if (this.resolvedData.data) {
        this.product = this.resolvedData.data;
        console.log(this.product);
      }
    });
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this.productForm = this._fb.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      categoryId: [1, Validators.required],
      description: [this.product.description, Validators.required],
      stock: [this.product.stock, Validators.required]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);

      const formDataWithUserId = {
        ...this.productForm.value,
        id: this.product.id,
        userId: this.product.userId
      };
      this._updateServiceService.updateProduct(formDataWithUserId).subscribe((res) => {
        console.log(res);
        this._toastService.show('Data is updated');
      });
    }
  }

  /**
   * Clk.
   */
  public clk(): void {
    this._loadingPageService.show();
  }
}
