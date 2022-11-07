import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "../types/LoginForm";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RegisterForm} from "../types/RegisterForm";
import {AuthResponse} from "../types/AuthResponse";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  login(data: LoginForm): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.apiURL + "/auth/login", data)
      .pipe((response) => {
        response.subscribe(value => {
          this.saveAuthResponse(value);
        });
        return response;
      });
  }

  signup(data: RegisterForm): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.apiURL + "/auth/signup", data)
      .pipe((response) => {
        response.subscribe(value => {
          this.saveAuthResponse(value);
        });
        return response;
      });
  }

  saveAuthResponse(response: AuthResponse): void {
    this.localStorage.store("token", response.token);
    this.localStorage.store("user", response.data.user);
    this.localStorage.store("loggedIn", true);
  }

  logout(): void {
    this.localStorage.clear("token");
    this.localStorage.clear("user");
    this.localStorage.clear("loggedIn");
  }

}
