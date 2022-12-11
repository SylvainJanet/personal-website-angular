import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarBigComponent } from './components/navbar/navbar-big/navbar-big.component';
import { NavbarComponent } from './components/navbar/main/navbar.component';
import { NavbarSmallComponent } from './components/navbar/navbar-small/navbar-small.component';
import { BodyComponent } from './components/body/main/body.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImgLoadDirective } from './directives/imgLoad/img-load.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroComponent,
    AboutComponent,
    FooterComponent,
    NavbarSmallComponent,
    NavbarBigComponent,
    BodyComponent,
    ImgLoadDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.baseHref }],
  bootstrap: [AppComponent],
})
export class AppModule {}
