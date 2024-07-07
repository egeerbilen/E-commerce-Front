import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';

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
   */
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      this.product = this.resolvedData.data;
      console.log(this.product);
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
      // API çağrısı yapılacak yer
      console.log(this.productForm.value);
    }
  }
}
