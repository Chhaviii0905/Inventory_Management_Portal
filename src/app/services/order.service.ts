import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(API_ENDPOINTS.getOrders);
  }

  getOrderById(id: number | string): Observable<any> {
    return this.http.get(API_ENDPOINTS.orderById(id));
  }
  createOrder(order: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.createOrder, order);
  }
  getRecentOrders(count: number): Observable<any> {
    return this.http.get(API_ENDPOINTS.getRecentOrders + `?count=${count}`);
  }

  updateOrderStatus(id: number | string, status: string): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.updateOrderStatus(id)}?status=${status}`, {});
  }
}
