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
import { FooterComponent } from './components/common/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImgLoadDirective } from './directives/imgLoad/img-load.directive';
import * as Hammer from 'hammerjs';
import { TypedAnimatedTextComponent } from './components/utilities/typed-animated-text/typed-animated-text.component';
import { HeaderComponent } from './components/common/header/header.component';
import { BackToTopComponent } from './components/common/back-to-top/back-to-top.component';
import { BannerComponent } from './components/common/banner/banner.component';
import { PageContentComponent } from './components/page-cv/page-content/page-content.component';
import { LinkBarOnHoverComponent } from './components/utilities/link-bar-on-hover/link-bar-on-hover.component';
import { ButtonBarOnHoverComponent } from './components/utilities/button-bar-on-hover/button-bar-on-hover.component';
import { HttpClientModule } from '@angular/common/http';
import { CvImgComponent } from './components/page-cv/cv-img/cv-img.component';
import { CvContactInfoComponent } from './components/page-cv/cv-contact-info/cv-contact-info.component';
import { CvSkillsComponent } from './components/page-cv/cv-skills/cv-skills.component';
import { CvSkillBarComponent } from './components/page-cv/cv-skill-bar/cv-skill-bar.component';
import { CvAboutMeComponent } from './components/page-cv/cv-about-me/cv-about-me.component';

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
    FooterComponent,
    ImgLoadDirective,
    TypedAnimatedTextComponent,
    HeaderComponent,
    BackToTopComponent,
    BannerComponent,
    PageContentComponent,
    LinkBarOnHoverComponent,
    ButtonBarOnHoverComponent,
    CvImgComponent,
    CvContactInfoComponent,
    CvSkillsComponent,
    CvSkillBarComponent,
    CvAboutMeComponent,
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
