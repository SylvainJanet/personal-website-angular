import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Http interceptor adding the XSRF token to every request to the API.
 *
 * The set up was done using :
 * https://www.stackhawk.com/blog/angular-csrf-protection-guide-examples-and-how-to-enable-it/
 * The cookie name can be configured by specifying the value in app.module
 * exports. The default value is XSRF-TOKEN.
 *
 * And to learn more about csrf : https://www.baeldung.com/spring-security-csrf
 */
@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  /**
   * The xsrf interceptor constructor
   *
   * @param tokenExtractor The {@link HttpXsrfTokenExtractor}
   */
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  /**
   * Intercept any request. Uses the `HttpXsrfTokenExtractor` to get the token
   * in the cookies, and sets up the xsrf token in the header of the request.
   * The header name is X-XSRF-TOKEN but can be configured here. To configure
   * the cookie name, the HttpClientXsrfModule has to be configured.
   *
   * @param req The intercepted request
   * @param next The `HttpHandler`
   * @returns The request, having added the xsrf header.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
