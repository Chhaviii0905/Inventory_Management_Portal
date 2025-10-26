import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [2]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Account created, you can login now',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonColor: '#035fc1',
          });
          this.router.navigate(['/login']);
        },
        error: () => {
          Swal.fire({
            title: 'Signup failed. Try again',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonColor: '#c1032fff',
          });
        }
      });
    }
  }
}
