import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { User } from '../../model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  activeTab: string = 'general';
  settings = {
    companyName: 'StorEase',
    supportEmail: 'support@storease.com',
    defaultCurrency: 'Rupee'
  };
  currentUser!: User;

  constructor(private userService: UserService) { }

  setTab(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'user') {
      this.getCurrentUser();
    }
  }

  saveChanges() {
    console.log('Settings saved:', this.settings);
    // You can integrate this with a service call here
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: user => this.currentUser = user,
      error: err => {
        Swal.fire({
          title: 'Failed to fetch current user',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          confirmButtonColor: '#c1032fff',
        });
      }
    });
  }

}
