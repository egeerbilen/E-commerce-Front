import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  resolvedData!: CustomResponseDto<ProductDto[]>;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   */
  constructor(private _route: ActivatedRoute) {
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData']; // Access resolved data here
    });
  }

  /**
   * DeleteProduct.
   * @param productId ProductId.
   */
  public deleteProduct(productId: number): void {
    this.resolvedData.data = this.resolvedData.data.filter((product) => product.id !== productId);
    console.log('Servis ekle');
  }
}
