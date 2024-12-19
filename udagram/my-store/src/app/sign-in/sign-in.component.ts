import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isSignUp: boolean = false;
  loginData: User = new User();
  hasError: boolean = false;

  constructor(private authService: AuthService) 
  {}
  
  onSubmit(): void {
    if (!this.isSignUp) {
      this.authService.signIn(this.loginData).subscribe({
        error: (err) => {
          console.log("error signing in! ", err);
          this.hasError = true;
        }
      });
    } else {
      this.authService.signUp(this.loginData).subscribe({
        error: (err) => {
          console.log("error signing up: ", err);
          this.hasError = true;
        }
      });
    }
  }
}
