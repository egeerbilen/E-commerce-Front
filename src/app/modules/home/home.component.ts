import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  resolvedData!: CustomResponseDto<ProductDto[]>;
  tokenStatus = false;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData']; // Access resolved data here
    });

    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      } else {
        this.tokenStatus = false;
      }
    });
  }

  /**
   * DeleteProduct.
   * @param productId ProductId.
   */
  public deleteProduct(productId: number): void {
    this.resolvedData.data = this.resolvedData.data!.filter((product) => product.id !== productId);
    console.log('Servis ekle');
  }

  /**
   * AddToBasket.
   * @param productId ProductId.
   */
  public addToBasket(productId: number): void {
    // Sepete ekleme işlemini burada gerçekleştirin
    console.log('Product added to cart:', productId);
  }
}
