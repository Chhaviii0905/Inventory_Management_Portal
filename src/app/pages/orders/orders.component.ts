import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
   orders = [
    { id: '#1024', customer: 'Jamie Lee', date: '2024-06-15', amount: 320, status: 'Pending' },
    { id: '#1023', customer: 'Morgan Yu', date: '2024-06-14', amount: 150, status: 'Completed' },
    { id: '#1022', customer: 'Taylor Kim', date: '2024-06-13', amount: 89, status: 'Shipped' },
    { id: '#1021', customer: 'Jordan Smith', date: '2024-06-12', amount: 210, status: 'Cancelled' }
  ];

  currentFilter = 'all';

  newOrder = {
    customer: '',
    amount: null,
    status: ''
  };

  get filteredOrders() {
    if (this.currentFilter === 'all') return this.orders;
    return this.orders.filter(o => o.status.toLowerCase() === this.currentFilter);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  addOrder() {
    if (!this.newOrder.customer || !this.newOrder.amount || !this.newOrder.status) return;
    const newId = '#10' + (this.orders.length + 20);
    this.orders.unshift({
      id: newId,
      customer: this.newOrder.customer,
      date: new Date().toISOString().split('T')[0],
      amount: this.newOrder.amount,
      status: this.newOrder.status
    });
    this.newOrder = { customer: '', amount: null, status: '' };
  }
}
