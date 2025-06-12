import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  showModal: boolean = false;
  modalTitle: string = '';
  modalFields: any[] = [];
  modalSubmitLabel: string = '';
  isEditing: boolean = false;
  editingProductId: number | null = null;
  isApiCalled: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(res => {
      if (res.success) this.products = res.data;
    });
  }

  openAddProductModal() {
    this.modalTitle = 'Add Product';
    this.modalSubmitLabel = 'Create';
    this.isEditing = false;
    this.editingProductId = null;

    this.modalFields = [
      { name: 'name', type: 'text', label: 'Product Name' },
      { name: 'price', type: 'number', label: 'Price' },
      { name: 'quantity', type: 'number', label: 'Quantity' }
    ];

    this.showModal = true;
  }

  openEditProductModal(product: any) {
    this.modalTitle = 'Edit Product';
    this.modalSubmitLabel = 'Update';
    this.isEditing = true;
    this.editingProductId = product.productId;

    this.modalFields = [
      { name: 'name', type: 'text', label: 'Product Name', value: product.name },
      { name: 'price', type: 'number', label: 'Price', value: product.price },
      { name: 'quantity', type: 'number', label: 'Quantity', value: product.quantity }
    ];

    this.showModal = true;
  }

  handleModalSubmit(formData: any) {
    if (!this.isApiCalled && this.isEditing && this.editingProductId !== null) {
      const updateData = { ...formData, productId: this.editingProductId };
      this.productService.update(updateData).subscribe(res => {
        alert(res.message);
        this.loadProducts();
        this.showModal = false;
      });
      this.isApiCalled = true;
    } else if(!this.isApiCalled) {
      this.productService.create(formData).subscribe(res => {
        alert(res.message);
        this.loadProducts();
        this.showModal = false;
      });
      this.isApiCalled = true;
    }
  }

  handleModalClose() {
    this.showModal = false;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(res => {
        alert(res.message);
        this.loadProducts();
      });
    }
  }
}
