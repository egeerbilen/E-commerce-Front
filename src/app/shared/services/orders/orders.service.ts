import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { OrderProductDto } from '../../dto/order-product-dto';
import { ProductDto } from '../../dto/product-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {
  /**
   * CreateOrderProduct.
   * @param orderProductDtos OrderProductDtos.
   * @returns Return.
   */
  public createOrderProduct(orderProductDtos: OrderProductDto[]): Observable<CustomResponseDto<null>> {
    return this.http.post(this.apiEndpoint.orderProduct, orderProductDtos);
  }

  /**
   * GetUserOrders.
   * @param userId UserId.
   * @returns Return.
   */
  public getUserOrders(userId: string): Observable<CustomResponseDto<OrderProductDto>> {
    return this.http.get(this.apiEndpoint.orderProduct + 'GetUserOrders/User/' + userId);
  }

  /**
   * GetOrderProducts.
   * @param orderId OrderId.
   * @returns Return.
   */
  public getOrderProducts(orderId: string): Observable<CustomResponseDto<ProductDto[]>> {
    return this.http.get(this.apiEndpoint.orderProduct + 'GetOrderProducts/Order/' + orderId);
  }
}
