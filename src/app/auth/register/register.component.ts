import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterForm} from "../../types/RegisterForm";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean = false;
  profilePic: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    this.isLoading = true;

    let data: RegisterForm = {
      name: this.registerForm.get("name")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
      passwordConfirm: this.registerForm.get("passwordConfirm")?.value,
      profileImg: this.profilePic
    };

    this.authService.signup(data).subscribe({
      next: response => {
        this.snackBar.open(response.status, "Close", {
          duration: 6000
        });
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
        this.snackBar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

  handleFileUpload(event: any): void {
    let reader = new FileReader();
    reader.onload = (loadedEvent) => {
      // @ts-ignore
      this.profilePic = loadedEvent.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
