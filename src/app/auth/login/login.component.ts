import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginForm} from "../../types/LoginForm";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.isLoading = true;

    let data: LoginForm = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('email')?.value
    };

    this.authService.login(data).subscribe({
      next: response => {
        this.isLoading = false;
        this.snackbar.open(response.status, "Close", {
          duration: 6000
        });
        this.router.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
        this.snackbar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

}
