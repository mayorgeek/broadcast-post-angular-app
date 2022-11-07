import { Injectable } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorage: LocalStorageService) { }

  isLoggedIn(): boolean {
    let loggedIn = this.localStorage.retrieve("loggedIn");
    return !!loggedIn;
  }

}
