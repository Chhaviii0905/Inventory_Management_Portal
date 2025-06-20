import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // use username here
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']); // or desired route
        },
        error: (err) => {
          alert('Login failed: Invalid credentials');
        }
      });
    }
  }
}
