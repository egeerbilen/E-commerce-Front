import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/service/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  resolvedCategoryData: CategoryDto[] = [];
  productForm: FormGroup;
  categories: CategoryDto[] = [];
  decodedToken: DecodedTokenWithJwtDto | null = null;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _route ActivatedRoute.
   * @param _toastService ToastService.
   * @param _productService AddProductService.
   * @param _userLocalStorageService UserLocalStorageService.
   * @param _store Store.
   */
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _toastService: ToastService,
    private _productService: ProductService,
    private _userLocalStorageService: UserLocalStorageService,
    private _store: Store
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedCategoryData = data['resolvedData'].data;
      this.categories = this.resolvedCategoryData;
    });

    this.productForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, Validators.nullValidator],
      imageData: [null],
      description: ['', [Validators.maxLength(500)]],
      categoryId: [1, Validators.required]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.productForm.valid) {
      let product: ProductCreateDto = this.productForm.value;
      this._store.select(getUserData).subscribe((res) => {
        this.decodedToken = res;
      });

      if (Number(this._userLocalStorageService.getUserId()) === 0) {
        return;
      }

      product = { ...product, userId: Number(this._userLocalStorageService.getUserId()) };
      this._productService.addProduct(product).subscribe();
      this._toastService.show('Product added');
    } else {
      this._toastService.show('Form is invalid');
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
