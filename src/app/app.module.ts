import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './components/common/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImgLoadDirective } from './directives/imgLoad/img-load.directive';
import { TypedAnimatedTextComponent } from './components/utilities/typed-animated-text/typed-animated-text.component';
import { HeaderComponent } from './components/common/header/header.component';
import { BackToTopComponent } from './components/common/back-to-top/back-to-top.component';
import { BannerComponent } from './components/common/banner/banner.component';
import { PageContentComponent } from './components/page-cv/page-content/page-content.component';
import { LinkBarOnHoverComponent } from './components/utilities/link-bar-on-hover/link-bar-on-hover.component';
import { ButtonBarOnHoverComponent } from './components/utilities/button-bar-on-hover/button-bar-on-hover.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CvImgComponent } from './components/page-cv/cv-img/cv-img.component';
import { CvContactInfoComponent } from './components/page-cv/cv-contact-info/cv-contact-info.component';
import { CvSkillsComponent } from './components/page-cv/cv-skills/cv-skills.component';
import { CvSkillBarComponent } from './components/page-cv/cv-skill-bar/cv-skill-bar.component';
import { CvAboutMeComponent } from './components/page-cv/cv-about-me/cv-about-me.component';
import { XsrfInterceptor } from './interceptors/xsrf.interceptor';
import { TextParagraphComponent } from './components/common/text-paragraph/text-paragraph.component';
import { TextParagraphSetComponent } from './components/common/text-paragraph-set/text-paragraph-set.component';
import { TextSubParagraphComponent } from './components/common/text-sub-paragraph/text-sub-paragraph.component';

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
    TextParagraphComponent,
    TextParagraphSetComponent,
    TextSubParagraphComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
