import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [2] // default role: Manager or User
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.value).subscribe({
        next: () => {
          alert('Account created! You can now log in.');
          this.router.navigate(['/login']);
        },
        error: () => alert('Signup failed. Try again.')
      });
    }
  }
}
