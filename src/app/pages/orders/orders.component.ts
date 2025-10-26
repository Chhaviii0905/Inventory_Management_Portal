import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  currentFilter = 'all';

  newOrder = {
    userId: 0,
    customerId: 0,
    status: '',
    items: [
      { productId: 0, quantity: 1 }
    ]
  };

  totalOrders = 0;
  pendingOrders = 0;
  completedOrders = 0;
  showModal: boolean = false;
  isEditing: boolean = false;
  modalSubmitLabel: string = '';
  modalTitle: string = '';
  modalFields: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res.data || [];
      this.calculateSummary();
    });
  }

  calculateSummary() {
    this.totalOrders = this.orders.length;
    this.pendingOrders = this.orders.filter(o => o.status?.toLowerCase() === 'pending').length;
    this.completedOrders = this.orders.filter(o => o.status?.toLowerCase() === 'completed').length;
  }

  get filteredOrders() {
    if (this.currentFilter === 'all') return this.orders;
    return this.orders.filter(o => o.status?.toLowerCase() === this.currentFilter);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  getTotalItems(order: any): number {
    return order.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
  }

  addItem() {
    this.newOrder.items.push({ productId: 0, quantity: 1 });
  }

  removeItem(index: number) {
    if (this.newOrder.items.length > 1) {
      this.newOrder.items.splice(index, 1);
    }
  }

  openAddOrderModal() {
    this.modalTitle = 'Create New Order';
    this.modalSubmitLabel = 'Create';
    this.isEditing = false;

    this.modalFields = [
      { name: 'customerId', type: 'text', label: 'Customer ID' },
      { name: 'productId', type: 'number', label: 'Product ID' },
      { name: 'quantity', type: 'number', label: 'Quantity' },
      {
        name: 'status',
        type: 'select',
        label: 'Status',
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Shipped', value: 'shipped' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' }
        ]
      }
    ];

    this.showModal = true;
  }

  handleModalSubmit(formData: any) {
    const newOrder = {
      userId: sessionStorage.getItem('userId') || 0,
      customerId: formData.customerId,
      status: formData.status,
      items: [
        {
          productId: formData.productId,
          quantity: formData.quantity
        }
      ]
    };

    this.orderService.createOrder(newOrder).subscribe(() => {
      Swal.fire({
        title: 'Order created successfully',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#035fc1',
      });
      this.showModal = false;
      this.loadOrders();
    });
  }

  handleModalClose() {
    this.showModal = false;
  }

  updateStatus(orderId: number, newStatus: string) {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      this.loadOrders();
    }); 
  }
}
