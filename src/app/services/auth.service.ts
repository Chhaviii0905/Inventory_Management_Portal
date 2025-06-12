import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5120/api/auth'; // update as needed

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.error('Token not found in response:', res);
        }
      })
    );
  }

  register(data: { username: string; password: string; roleId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
