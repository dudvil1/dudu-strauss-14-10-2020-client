import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { token } from "../ngrxState/reducers";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public HttpToken: String;
  constructor(private store: Store<any>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.select(token).subscribe((JWTtoken) => {
      this.HttpToken = JWTtoken;
    });
    if (this.HttpToken) {
      req = req.clone({
        headers: req.headers.set("Authorization", "JWT " + this.HttpToken),
      });
    }
    return next.handle(req);
  }
}
