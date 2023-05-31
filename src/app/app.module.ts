import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { APP_BASE_HREF } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
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
import * as Hammer from 'hammerjs';
import { TypedAnimatedTextComponent } from './components/tools/typed-animated-text/typed-animated-text.component';
import { HeaderComponent } from './components/header/header.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { BannerComponent } from './components/banner/banner.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { LinkBarOnHoverComponent } from './components/link-bar-on-hover/link-bar-on-hover.component';
import { ButtonBarOnHoverComponent } from './components/button-bar-on-hover/button-bar-on-hover.component';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MyHammerConfig extends HammerGestureConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroComponent,
    AboutComponent,
    FooterComponent,
    IntroComponent,
    NavbarSmallComponent,
    NavbarBigComponent,
    BodyComponent,
    ImgLoadDirective,
    NavbarBigComponent,
    NavbarSmallComponent,
    TypedAnimatedTextComponent,
    HeaderComponent,
    BackToTopComponent,
    BannerComponent,
    PageContentComponent,
    LinkBarOnHoverComponent,
    ButtonBarOnHoverComponent,
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
    HammerModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
