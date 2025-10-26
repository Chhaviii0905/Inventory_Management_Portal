import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels } from 'ngx-apexcharts';
import { ProductService } from '../../services/products.service';
import { LogsService } from '../../services/logs.service';
import { ActivityLog, User } from '../../model';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'bar',
    height: 350
  };
  chartTitle: ApexTitleSubtitle = {
    text: 'Product Stock Overview'
  };
  chartXAxis: ApexXAxis = {
    categories: []
  };
  dataLabels: ApexDataLabels = {
    enabled: true
  };
  logs: ActivityLog[] = [];
  filter: string = 'all';
  totalItems: number = 0;
  count: number = 5;
  recentOrders: any;
  modalFields: { name: string; type: string; label: string; value: any; }[] = [];
  modalTitle: string = '';
  modalSubmitLabel: string = '';
  showModal: boolean = false;
  lowStockItems: any[] = [];
  lowStockCount: number = 0;
  pendingOrders: any[] = [];
  pendingOrdersCount: number = 0;
  currentUser: User = {} as User;

  constructor(private productService: ProductService, private logsService: LogsService, private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: any) => {
      const productNames = products.data.map((p: { name: any; }) => p.name);
      const stockValues = products.data.map((p: { quantity: any; }) => p.quantity);
      this.totalItems = products.data.length;
      this.lowStockItems = (products.data || []).filter((p: any) => Number(p.quantity) < 10);
      this.lowStockCount = this.lowStockItems.length;

      this.chartXAxis.categories = productNames;
      this.chartSeries = [
        {
          name: 'Stock',
          data: stockValues
        }
      ];
    });

    this.logsService.getLogs().subscribe(data => {
      this.logs = data;
    });
    this.getRecentOrders();
    this.getCurrentUser();
  }

  get filteredLogs() {
    if (this.filter === 'all') return this.logs;
    return this.logs.filter(log => log.action.toLowerCase() === this.filter);
  }

  setFilter(type: string) {
    this.filter = type;
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
          const data = response;
          this.currentUser = data;
          sessionStorage.setItem('userId', data.id.toString());
          sessionStorage.setItem('roleId', data.role.toString());
          sessionStorage.setItem('username', data.name);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  openLogsModal(log?: ActivityLog) {
    if (log) {
      this.modalTitle = 'Activity Log Detail';
      this.modalFields = [
        { name: 'action', type: 'display', label: 'Action', value: log.action || '' },
        { name: 'performedBy', type: 'display', label: 'Performed By', value: log.performedBy || '' },
        { name: 'entity', type: 'display', label: 'Entity', value: log.entity || '' },
        { name: 'entityId', type: 'display', label: 'Entity Id', value: log.entityId || '' },
        { name: 'creationTime', type: 'display', label: 'Created At', value: (typeof log.id === 'object' ? (log.id as any).creationTime : '') || '' },
        { name: 'timestamp', type: 'display', label: 'Event Time', value: log.timestamp || '' }
      ];
    } else {
      this.modalTitle = 'Recent Activity Logs';
      const recent = (this.logs || []).slice(0, 10).map(l => {
        const created = (l && typeof l.id === 'object' && (l.id as any).creationTime)
          ? (l.id as any).creationTime
          : (typeof l.id === 'string' ? l.id : '-');
        return `Action: ${l.action || '-'}\nBy: ${l.performedBy || '-'}\nEntity: ${l.entity || '-'} (${l.entityId || '-'})\nCreated: ${created}\nTimestamp: ${l.timestamp || '-'}`;
      }).join('\n\n--------------------\n\n');
      this.modalFields = [
        { name: 'logs', type: 'display', label: 'Recent Logs', value: recent || 'No recent logs' }
      ];
    }
    this.modalSubmitLabel = 'Close';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalFields = [];
  }

  onModalSubmit(_data: any) {
    // modal is read-only for logs; simply close
    this.closeModal();
  }

  getRecentOrders() {
    this.orderService.getRecentOrders(this.count).subscribe(resp => {
      this.recentOrders = (resp && resp.data) ? resp.data : [];
      this.pendingOrders = this.recentOrders.filter((order: { status: string; }) => order.status === 'Pending');
      this.pendingOrdersCount = this.pendingOrders.length;
    }, err => {
      Swal.fire({
        title: 'Failed to fetch recent orders',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#035fc1',
      });
      this.recentOrders = [];
      this.pendingOrders = [];
      this.pendingOrdersCount = 0;
    });
  }

  openLowStockModal() {
    const N = 50; // display cap
    const items = (this.lowStockItems || []).slice(0, N);
    const total =
      typeof this.lowStockCount === 'number'
        ? this.lowStockCount
        : (this.lowStockItems || []).length;

    this.modalTitle = `Low Stock Items (showing ${items.length} of ${total})`;

    const formatted = items.length
      ? items
        .map((it: any, i: number) => {
          return (
            `#${i + 1}.  Product: ${it.name || 'Unnamed'}\n` +
            `Quantity: ${it.quantity ?? '-'}\n` +
            `Product ID: ${it.id ?? it.productId ?? '-'}`
          );
        })
        .join('\n\n------------------------------\n\n')
      : 'No low-stock items';

    this.modalFields = [
      {
        name: 'lowStock',
        type: 'display',
        label: 'Low Stock Items',
        value: formatted,
      },
    ];

    this.modalSubmitLabel = 'Close';
    this.showModal = true;
  }

  openPendingOrdersModal() {
    const N = 50;
    const orders = (this.pendingOrders || []).slice(0, N);
    const total =
      typeof this.pendingOrdersCount === 'number'
        ? this.pendingOrdersCount
        : (this.pendingOrders || []).length;

    this.modalTitle = `Pending Orders (showing ${orders.length} of ${total})`;

    // Format pending orders like readable activity logs
    const formattedOrders = orders.length
      ? orders
        .map((o: any, i: number) => {
          const when = o.orderDate
            ? new Date(o.orderDate).toLocaleString()
            : o.timestamp
              ? new Date(o.timestamp).toLocaleString()
              : '-';
          const itemsCount = o.itemsCount ?? (o.items ? o.items.length : 0);

          return (
            `#${i + 1}.  Order ID: ${o.orderId ?? '-'}\n` +
            `Customer: ${o.customerName || '-'}\n` +
            `Status: ${o.status || '-'}\n` +
            `Items: ${itemsCount}\n` +
            `Time: ${when}`
          );
        })
        .join('\n\n------------------------------\n\n')
      : 'No pending orders';

    this.modalFields = [
      {
        name: 'pendingOrders',
        type: 'display',
        label: 'Pending Orders',
        value: formattedOrders,
      },
    ];

    this.modalSubmitLabel = 'Close';
    this.showModal = true;
  }

}

