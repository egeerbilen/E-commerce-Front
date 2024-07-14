import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { OrderDto } from '../../dto/order-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  /**
   * Get all order.
   * @returns Observable with all order.
   */
  public getAll(): Observable<CustomResponseDto<OrderDto[]>> {
    return this.http.get(`${this.apiEndpoint.order}`);
  }

  /**
   * Get order by id.
   * @param id Order ID.
   * @returns Observable with the order.
   */
  public getById(id: number): Observable<CustomResponseDto<OrderDto>> {
    return this.http.get(`${this.apiEndpoint.order}/${id}`);
  }

  /**
   * Create a new order.
   * @param orderDto Order data transfer object.
   * @returns Observable with the created order.
   */
  public create(orderDto: OrderDto): Observable<CustomResponseDto<OrderDto>> {
    return this.http.post(`${this.apiEndpoint.order}`, orderDto);
  }

  /**
   * Update an order.
   * @param orderDto Order data transfer object.
   * @returns Observable with the updated order.
   */
  public update(orderDto: OrderDto): Observable<CustomResponseDto<OrderDto>> {
    return this.http.put(`${this.apiEndpoint.order}`, orderDto);
  }

  /**
   * Remove an order.
   * @param id Order ID.
   * @returns Observable with the result of the removal.
   */
  public remove(id: number): Observable<CustomResponseDto<null>> {
    return this.http.delete(`${this.apiEndpoint.order}/${id}`);
  }

  /**
   * Create a list of orders.
   * @param orderDtos List of order data transfer objects.
   * @returns Observable with the result of the creation.
   */
  public createList(orderDtos: OrderDto[]): Observable<CustomResponseDto<OrderDto[]>> {
    return this.http.post(`${this.apiEndpoint.order}/createList`, orderDtos);
  }
}
