import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    return next.handle(request);
  }
}
