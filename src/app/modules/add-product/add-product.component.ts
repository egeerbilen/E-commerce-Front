import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  /**
   * Constructor.
   * @param _fb FormBuilder.
   * @param _toastService ToastService.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _loadingPageService: LoadingPageService
  ) {
    this.productForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0],
      imageData: [null],
      description: ['', [Validators.maxLength(500)]]
      // !! UNUTMA EKLE BUNLARI
      // !! userId: [0, Validators.required],
      // !! categoryId: [0, Validators.required]
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
    if (this.productForm.valid) {
      const product: ProductCreateDto = this.productForm.value;
      console.log(product);
      // Ürünü backend'e gönderme işlemi burada yapılabilir.
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
