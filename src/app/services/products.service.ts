import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  update(product: any): Observable<any> {
    return this.http.put(this.apiUrl, product);
  }
}
