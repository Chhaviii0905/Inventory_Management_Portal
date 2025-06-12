import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.scss'
})
export class ActivityLogsComponent {
  filter: string = 'all';

  logs = [
    { date: '2024-06-15 10:12', activity: 'Order #1024 created', user: 'Jamie Lee', type: 'Info' },
    { date: '2024-06-15 09:45', activity: 'Payment failed', user: 'Morgan Yu', type: 'Error' },
    { date: '2024-06-15 08:30', activity: 'User login', user: 'Taylor Kim', type: 'User' },
    { date: '2024-06-15 08:50', activity: 'Settings updated', user: 'Jordan Smith', type: 'System' }
  ];

  get filteredLogs() {
    if (this.filter === 'all') return this.logs;
    return this.logs.filter(log => log.type.toLowerCase() === this.filter);
  }

  setFilter(type: string) {
    this.filter = type;
  }
}
