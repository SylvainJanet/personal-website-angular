import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
  ENV,
  getEnv,
} from './environments/injectionToken/environment-provider';
import { environment } from './environments/environment';
import { XsrfInterceptor } from './app/interceptors/xsrf/xsrf.interceptor';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
    { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
    { provide: ENV, useFactory: getEnv },
    provideHttpClient(),
  ],
});
