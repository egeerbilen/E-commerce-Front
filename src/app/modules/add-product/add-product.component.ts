import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { DecodedTokenDto } from 'src/app/shared/dto/decoded-token-dto';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { AddProductService } from './service/add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  tokenStatus = false;
  decodedTokenStatus!: DecodedTokenDto | null;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _toastService ToastService.
   * @param _loadingPageService LoadingPageService.
   * @param _addProductService AddProductService.
   * @param _store Store.
   */
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _loadingPageService: LoadingPageService,
    private _addProductService: AddProductService,
    private _store: Store
  ) {
    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
      this.decodedTokenStatus = res;
    });

    this.productForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0],
      imageData: [null],
      description: ['', [Validators.maxLength(500)]],
      categoryId: [1, Validators.required]
      // !! UNUTMA EKLE BUNLARI
      // !! userId: [0, Validators.required],
    });

    // TODO assagidakini kaydediyor ayrıca img i almadim altta dikkayt
    // {
    //   "name": "eeeeeeeeeeeeeeeeeeee",
    //   "price":1,
    //   "stock": 1,
    //   "description": "string",
    //   "userId": 1,
    //   "categoryId": 2
    // }
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    this._loadingPageService.show();
    if (this.productForm.valid) {
      let product: ProductCreateDto = this.productForm.value;

      if (!this.decodedTokenStatus?.userId) {
        return;
      }

      product = { ...product, userId: Number(this.decodedTokenStatus?.userId) };
      this._addProductService.addProduct(product).subscribe();
    }

    this._toastService.show('Data updated');
    this._loadingPageService.hide();
  }

  /**
   * OnFileChange.
   * @param event Event.
   */
  public onFileChange(event: any): void {
    this._loadingPageService.show();
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
    this._loadingPageService.hide();
  }
}
