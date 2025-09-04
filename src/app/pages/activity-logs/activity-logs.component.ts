import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { ActivityLog } from '../../model';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss']
})
export class ActivityLogsComponent implements OnInit {
  filter: string = 'all';
  logs: ActivityLog[] = [];
  todayCount: number = 0;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.logsService.getLogs().subscribe(data => {
      this.logs = data;

      const today = new Date().toDateString();
      this.todayCount = this.logs.filter(log => 
        new Date(log.timestamp).toDateString() === today
      ).length;
    });
  }

  get filteredLogs() {
    if (this.filter === 'all') return this.logs;
    return this.logs.filter(log => log.action.toLowerCase() === this.filter);
  }

  setFilter(type: string) {
    this.filter = type;
  }

  private mapType(action: string): string {
    if (action.toLowerCase().includes('error')) return 'Error';
    if (action.toLowerCase().includes('login')) return 'User';
    if (action.toLowerCase().includes('updated') || action.toLowerCase().includes('system')) return 'System';
    return 'Info';
  }
}
