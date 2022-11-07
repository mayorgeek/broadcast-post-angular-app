import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private localStorage: LocalStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone();
    const jwtToken: string = this.localStorage.retrieve("token");

    // Check if token exist
    if (jwtToken) {
      request = this.addToken(req, jwtToken);
    }

    return next.handle(request).pipe(
      catchError(
        (err) => {
          if (err.statusCode == 401) {
            console.log(err);
            this.router.navigate(['/auth/login']);
            this.localStorage.clear("loggedIn");
            this.localStorage.clear("token");
            this.localStorage.clear("user");
          }
          return throwError(err);
        }
      )
    );
  }

  private addToken(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
    return req.clone({
      headers: new HttpHeaders({
        "Authorization": `Bearer ${jwtToken}`
      })
    });
  }

}
