import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { DecodedTokenDto } from 'src/app/shared/dto/decoded-token-dto';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

import { AddProductService } from './service/add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  tokenStatus = '';
  decodedTokenStatus!: DecodedTokenDto | null;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _toastService ToastService.
   * @param _loadingPageService LoadingPageService.
   * @param _addProductService AddProductService.
   * @param _userLocalStorageService UserLocalStorageService.
   */
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _loadingPageService: LoadingPageService,
    private _addProductService: AddProductService,
    private _userLocalStorageService: UserLocalStorageService
  ) {
    this.tokenStatus = this._userLocalStorageService.getToken(); // res null, undefined, 0, "", false falsy olacak
    this.productForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0],
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

      if (Number(this._userLocalStorageService.getUserId()) === 0) {
        return;
      }

      product = { ...product, userId: Number(this._userLocalStorageService.getUserId()) };
      this._addProductService.addProduct(product).subscribe();
    }

    this._toastService.show('Data updated');
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
