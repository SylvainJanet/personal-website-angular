import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { XsrfInterceptor } from './xsrf.interceptor';

// https://angular.io/guide/http-test-requests
describe('XsrfInterceptor - integration', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testUrl = 'this/is/a/test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
      ],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  /// Tests begin ///
  it('should not change the method', () => {
    httpClient.get(testUrl).subscribe({});

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');
  });

  it('should not change the url', () => {
    httpClient.get(testUrl).subscribe({});

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.url).toEqual(testUrl);
  });

  it('should add xsrf token in headers', () => {
    httpClient.get(testUrl).subscribe({});

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request).toSatisfy(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: HttpRequest<any>) => r.headers.has('X-XSRF-TOKEN')
    );
  });

  it('should add with credentials true', () => {
    httpClient.get(testUrl).subscribe({});

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request).toSatisfy(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: HttpRequest<any>) => r.withCredentials
    );
  });

  it('should add the correct xsrf token in headers', () => {
    const tokenExtractor = TestBed.inject(HttpXsrfTokenExtractor);

    httpClient.get(testUrl).subscribe({});

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request).toSatisfy(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: HttpRequest<any>) => r.headers.has('X-XSRF-TOKEN')
    );

    expect(req.request).toSatisfy(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: HttpRequest<any>) =>
        r.headers.get('X-XSRF-TOKEN') ===
        ((tokenExtractor.getToken() as string) ?? 'null')
    );
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
