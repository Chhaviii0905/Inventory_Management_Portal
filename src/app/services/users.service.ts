import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EditUser, NewUser, RawUser, User } from '../model';
import { environment } from '../../environment';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{data:RawUser[]}>(API_ENDPOINTS.users).pipe(
      map(response =>
        response.data.map((user) => ({
          id: user.userId,
          name: user.username,
          role: this.mapRole(user.roleId),
          status: 'Active',
        }))
      )
    );
  }

  createUser(user: NewUser): Observable<RawUser> {
    return this.http.post<{data: RawUser}>(API_ENDPOINTS.createUser, user).pipe(
      map(response => response.data));
  }

  updateUser(id: number | string, user: EditUser): Observable<void> {
    return this.http.put<void>(API_ENDPOINTS.updateUser(id), user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.deleteUser(id));
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<{data: RawUser}>(API_ENDPOINTS.getCurrentUser).pipe(
      map(response => {
        const user = response.data; 
        return {
          id: user.userId,
          name: user.username,
          role: this.mapRole(user.roleId),
          status: 'Active',
        };
      })
    );
  }

  private mapRole(roleId: number): 'Admin' | 'Manager' | 'Staff' {
    switch (roleId) {
      case 1:
        return 'Admin';
      case 2:
        return 'Manager';
      case 3:
        return 'Staff';
      default:
        return 'Staff';
    }
  }
}
