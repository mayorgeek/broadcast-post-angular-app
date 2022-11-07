import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePostForm} from "../types/CreatePostForm";
import {environment} from "../../environments/environment";
import {Post} from "../types/Post";
import {UpdatePostForm} from "../types/UpdatePostForm";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  createPost(data: CreatePostForm): Observable<any> {
    return this.httpClient.post(environment.apiURL + "/Posts", data);
  }

  getPost(postId: string): Observable<any> {
    return this.httpClient.get(environment.apiURL + `/Posts/${postId}`);
  }

  updatePost(postId: string, data: UpdatePostForm): Observable<any> {
    return this.httpClient.put(environment.apiURL + `/Posts/${postId}`, data);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(environment.apiURL + `/Posts/${postId}`);
  }

  getAllPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(environment.apiURL + "/Posts");
  }

}
