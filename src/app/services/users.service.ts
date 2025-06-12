import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EditUser, NewUser, RawUser, User } from '../model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{data:RawUser[]}>(this.apiUrl).pipe(
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
    return this.http.post<{data: RawUser}>(this.apiUrl, user).pipe(
      map(response => response.data));
  }

  updateUser(id: number, user: EditUser): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
