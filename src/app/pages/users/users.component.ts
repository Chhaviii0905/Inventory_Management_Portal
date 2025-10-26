import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  roles = ['Admin', 'Manager', 'Staff'];
  showModal = false;
  users: User[] = [];
  totalActiveUsers = 0;
  modalTitle = '';
  modalSubmitLabel = '';
  userFields: Array<{ name: string; type: string; label: string; value?: any; options?: string[] }> = [];
  isEditing = false;
  editingUserId: number | null = null;
  isApiCalled: boolean = false;
  currentUser!: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.totalActiveUsers = data.length;
    });
  }

  openCreateModal() {
    this.resetModal();
    this.modalTitle = 'Create User';
    this.modalSubmitLabel = 'Create';
    this.isEditing = false;

    this.userFields = [
      { name: 'username', type: 'text', label: 'Username' },
      { name: 'password', type: 'password', label: 'Password' },
      { name: 'role', type: 'select', label: 'Role', options: this.roles }
    ];

    this.showModal = true;
  }

  openUpdateModal(user: User) {
    this.modalTitle = 'Update User';
    this.modalSubmitLabel = 'Update';
    this.isEditing = true;
    this.editingUserId = user.id;

    this.userFields = [
      { name: 'username', type: 'text', label: 'Username', value: user.name },
      { name: 'password', type: 'password', label: 'Password', value: '' },
      { name: 'role', type: 'select', label: 'Role', value: user.role, options: this.roles }
    ];

    this.showModal = true;
  }

  handleModalSubmit(data: any) {
    if (this.isApiCalled) return; // prevent multiple submissions

    if (this.isEditing && this.editingUserId !== null) {
      // Update user
      const updatePayload = {
        userId: this.editingUserId,
        username: data.username,
        password: data.password,
        roleId: this.getRoleId(data.role)
      };

      this.userService.updateUser(this.editingUserId, updatePayload).subscribe({
        next: () => {
          this.loadUsers();
          this.showModal = false;
          Swal.fire({
            title: 'User updated successfully!',
            icon: 'success',
            confirmButtonColor: '#035fc1'
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error updating user',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonColor: '#c1032fff'
          });
        }
      });
    } else {
      // Create user
      const createPayload = {
        username: data.username,
        password: data.password,
        roleId: this.getRoleId(data.role)
      };

      this.userService.createUser(createPayload).subscribe({
        next: () => {
          this.loadUsers();
          this.showModal = false;
          Swal.fire({
            title: 'User created successfully!',
            icon: 'success',
            confirmButtonColor: '#035fc1'
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error creating user',
            text: err.message || 'Something went wrong',
            icon: 'error',
            confirmButtonColor: '#c1032fff'
          });
        }
      });
    }

    this.isApiCalled = true; // prevent double submission
  }


  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#035fc1',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== id);
            this.totalActiveUsers = this.users.length;

            Swal.fire({
              title: 'User deleted successfully',
              icon: 'success',
              confirmButtonColor: '#035fc1'
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error deleting user',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonColor: '#c1032fff'
            });
          }
        });
      }
    });
  }

  getRoleId(roleName: string): number {
    switch (roleName) {
      case 'Admin': return 1;
      case 'Manager': return 2;
      case 'Staff': return 3;
      default: return 3;
    }
  }

  getRoleName(roleId: number): 'Admin' | 'Manager' | 'Staff' {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      case 3: return 'Staff';
      default: return 'Staff';
    }
  }

  resetModal() {
    this.showModal = false;
    this.userFields = [];
    this.editingUserId = null;
  }
}
