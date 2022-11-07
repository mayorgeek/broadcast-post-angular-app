import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreatePostForm} from "../../types/CreatePostForm";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'posts-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isLoading: boolean = false;
  createPostForm: FormGroup;
  profilePic: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.createPostForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createPost(): void {
    this.isLoading = true;

    let data: CreatePostForm = {
      title: this.createPostForm.get("title")?.value,
      description: this.createPostForm.get("description")?.value,
      postImg: this.profilePic
    };

    this.postService.createPost(data).subscribe({
      next: response => {
        this.isLoading = false;
        this.snackbar.open("New Post Created", "Close", {
          duration: 4000
        });
        this.router.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        this.snackbar.open(err.error.message, "Close", {
          duration: 4000
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
