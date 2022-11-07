import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdatePostForm} from "../../types/UpdatePostForm";
import {Post} from "../../types/Post";

@Component({
  selector: 'posts-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isLoading: boolean = false;
  postId: string = "";
  profilePic: string = "";

  updatePostForm: FormGroup;
  post: Post = {
    id: "",
    title: "",
    description: "",
    postImg: "",
    createdAt: "",
    updatedAt: "",
    user: {
      id: "",
      name: "",
      email: "",
      profileImg: "",
      role: "",
      createdAt: "",
      updatedAt: ""
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.updatePostForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.getPost(params['postId']);
      }
    });
  }


  getPost(postId: string): void {
    this.isLoading = true;

    this.postService.getPost(postId).subscribe({
      next: post => {
        this.post = post;
        this.isLoading = false;
      },
      error: err =>  {
        this.isLoading = false;
        this.snackbar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

  updatePost(): void {
    this.isLoading = true;

    let data: UpdatePostForm = {
      id: "",
      title: this.updatePostForm.get("title")?.value,
      description: this.updatePostForm.get("description")?.value,
      postImg: this.profilePic,
      createdAt: "",
      updatedAt: ""
    };

    this.postService.updatePost(this.postId, data).subscribe({
      next: response => {
        this.isLoading = false;
        this.snackbar.open("Post Updated", "Close", {
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
