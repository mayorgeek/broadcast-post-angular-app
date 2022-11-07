import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Post} from "../../types/Post";

@Component({
  selector: 'posts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoading: boolean = false;
  posts: Array<Post> = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }


  viewPost(postId: string): void {
    this.router.navigate(['/view'], {
      queryParams: {
        postId: postId
      }
    });
  }

  editPost(postId: string): void {
    this.router.navigate(['/edit'], {
      queryParams: {
        postId: postId
      }
    });
  }

  delete(postId: string): void {
    this.isLoading = false;

    this.postService.deletePost(postId).subscribe({
      next: value => {
        this.isLoading = false;
        this.snackbar.open("Post Deleted", "Close", {
          duration: 4000
        });
      },
      error: err => {
        this.isLoading = false;
        this.snackbar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

  getPosts(): void {
    this.isLoading = true;

    this.postService.getAllPosts().subscribe({
      next: posts => {
        this.isLoading = false;
        this.posts = posts;
      },
      error: err => {
        this.isLoading = false;
        this.snackbar.open(err.error.message, "Close", {
          duration: 6000
        });
      }
    });
  }

}
