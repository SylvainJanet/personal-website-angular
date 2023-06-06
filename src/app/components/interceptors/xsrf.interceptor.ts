import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: any, next: HttpHandler): Observable<HttpEvent<any>> {
    const cookieheaderName = 'X-XSRF-TOKEN';
    const csrfToken = this.tokenExtractor.getToken() as string;
    req = req.clone({
      headers: req.headers.set(cookieheaderName, csrfToken ?? 'null'),
      withCredentials: true,
    });
    return next.handle(req);
  }
}
