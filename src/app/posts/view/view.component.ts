import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post} from "../../types/Post";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'posts-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

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
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.getPost(params['postId']);
    });
  }

  getPost(postId: string): void {
    this.postService.getPost(postId).subscribe({
      next: post => {
        this.post = post;
      },
      error: err => {
        this.snackbar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

}
