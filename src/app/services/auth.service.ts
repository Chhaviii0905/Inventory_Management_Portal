import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:5120/api/auth'; // update as needed

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(API_ENDPOINTS.userLogin, data).pipe(
      tap((res: any) => {
        const token = res?.data?.token;
        if (token) {
          sessionStorage.setItem('token', token);
        } else {
          console.error('Token not found in response:', res);
        }
      })
    );
  }

  register(data: { username: string; password: string; roleId: number }): Observable<any> {
    return this.http.post(API_ENDPOINTS.userRegister, data);
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
