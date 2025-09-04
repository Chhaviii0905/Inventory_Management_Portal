import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../api-endpoints';
import { ActivityLog } from '../model';

@Injectable({ providedIn: 'root' })
export class LogsService {

  constructor(private http: HttpClient) {}

  getLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(API_ENDPOINTS.activityLogs);
  }
}
