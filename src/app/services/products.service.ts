import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.products}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.deleteProduct(id)}`);
  }

  create(product: any): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.products}`, product);
  }

  update(product: any): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.updateProduct}`, product);
  }
}
