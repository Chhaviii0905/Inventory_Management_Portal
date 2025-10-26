import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      confirmButtonColor: '#035fc1',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }
    });
  }
}
