import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  resolvedData!: CustomResponseDto<ProductDto>;
  product!: ProductDto;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   */
  constructor(private _route: ActivatedRoute) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      if (this.resolvedData.data) {
        this.product = this.resolvedData.data;
      }
    });
  }

  /**
   * AddToBasket.
   */
  public addToBasket(): void {
    console.log('addToBasket');
  }

  /**
   * AddToFavorites.
   */
  public addToFavorites(): void {}
}
