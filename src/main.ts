import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ENV,
  getEnv,
} from './environments/injectionToken/environment-provider';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

if (environment.production) {
  enableProdMode();
}
registerLocaleData(localeFr, 'fr-FR');
bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
    { provide: ENV, useFactory: getEnv },
    provideHttpClient(),
  ],
});
