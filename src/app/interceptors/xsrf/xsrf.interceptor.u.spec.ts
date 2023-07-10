import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { XsrfInterceptor } from './xsrf.interceptor';
import { Observable } from 'rxjs';

describe('XsrfInterceptor - unit', () => {
  let xsrfInterceptor: XsrfInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
      ],
    });

    xsrfInterceptor = new XsrfInterceptor(
      TestBed.inject(HttpXsrfTokenExtractor)
    );
  });

  it('should be an interceptor', () => {
    expect(xsrfInterceptor).toBeTruthy();
    expect(xsrfInterceptor.intercept).toBeTruthy();
  });

  describe('intercept method', () => {
    let httpHandler: jasmine.SpyObj<HttpHandler>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let httpRequest: HttpRequest<any>;
    const testMethod = 'GET';
    const testUrl = 'this/is/a/test';

    beforeEach(() => {
      httpHandler = jasmine.createSpyObj(HttpHandler, ['handle']);
      httpRequest = new HttpRequest(testMethod, testUrl);
    });

    it('should return handled request', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expected = new Observable<HttpEvent<any>>();
      httpHandler.handle.and.returnValue(expected);

      const actual = xsrfInterceptor.intercept(httpRequest, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });

    it('should not change the method', () => {
      xsrfInterceptor.intercept(httpRequest, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ method: testMethod })
      );
    });

    it('should not change the url', () => {
      xsrfInterceptor.intercept(httpRequest, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ url: testUrl })
      );
    });

    it('should add xsrf token in headers', () => {
      xsrfInterceptor.intercept(httpRequest, httpHandler);
      expect(httpHandler.handle).toHaveBeenCalledTimes(1);
      expect(httpHandler.handle.calls.allArgs()[0][0]).toSatisfy(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: HttpRequest<any>) => r.headers.has('X-XSRF-TOKEN')
      );
    });

    it('should add with credentials true', () => {
      xsrfInterceptor.intercept(httpRequest, httpHandler);
      expect(httpHandler.handle).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ withCredentials: true })
      );
    });

    it('should add the correct xsrf token in headers', () => {
      const tokenExtractorSpy = jasmine.createSpyObj('HttpXsrfTokenExtractor', [
        'getToken',
      ]);
      const expected = 'this is a test value';
      tokenExtractorSpy.getToken.and.returnValue(expected);

      xsrfInterceptor = new XsrfInterceptor(tokenExtractorSpy);

      xsrfInterceptor.intercept(httpRequest, httpHandler);
      expect(httpHandler.handle).toHaveBeenCalledTimes(1);
      expect(httpHandler.handle.calls.allArgs()[0][0]).toSatisfy(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: HttpRequest<any>) => r.headers.has('X-XSRF-TOKEN')
      );
      expect(httpHandler.handle.calls.allArgs()[0][0]).toSatisfy(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: HttpRequest<any>) => r.headers.get('X-XSRF-TOKEN') === expected
      );
    });
  });
});
