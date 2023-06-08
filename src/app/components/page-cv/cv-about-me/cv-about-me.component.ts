import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TestService } from 'src/app/services/db/test/test.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { environment } from 'src/environments/environment';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { debounce } from 'src/scripts/tools/debounce';

@Component({
  selector: 'app-cv-about-me',
  templateUrl: './cv-about-me.component.html',
  styleUrls: ['./cv-about-me.component.css'],
})
export class CvAboutMeComponent
  implements AfterViewInit, ComponentWithText, OnDestroy
{
  width = '0';
  posElementMin = 0;
  posElementMax = 0;
  preloader: PreloaderService;
  element: ElementRef;
  env = environment;
  message = '';
  logger: LogService;
  aboutMe = of('');
  subtitle = '';
  firstPart = '';
  secondPart = '';
  thirdPart = '';
  forthPart = '';
  fifthPart = '';
  myCv = '';
  linkToCv = '';

  constructor(
    preloaderService: PreloaderService,
    elRef: ElementRef,
    private testService: TestService,
    private httpClient: HttpClient,
    logService: LogService,
    private domComputationService: DOMComputationService,
    private languageService: LanguageService,
    private textService: TextService
  ) {
    this.element = elRef;
    this.preloader = preloaderService;
    this.logger = logService.withClassName('CvAboutMeComponent');
    this.languageService.subscribe(this);
    this.updateTexts();
  }
  updateTexts(): void {
    this.aboutMe = this.textService.get('about-me-title');
    this.textService.get('cv-file-name').subscribe({
      next: (name) => (this.linkToCv = 'assets/pdf/' + name),
    });
    this.textService.getSplit('about-me-content').subscribe({
      next: (r) => {
        this.subtitle = r[0];
        this.firstPart = r[1];
        this.secondPart = r[2];
        this.thirdPart =
          r[3] +
          '<strong><em>' +
          r[4] +
          '</em></strong>' +
          r[5] +
          '<strong><em>' +
          r[6] +
          '</em></strong>' +
          r[7] +
          '<strong><em>' +
          r[8] +
          '</em></strong>' +
          r[9] +
          '<strong><em>' +
          r[10] +
          '</em></strong>' +
          r[11] +
          '<strong><em>' +
          r[12] +
          '</em></strong>' +
          r[13] +
          '<strong><em>' +
          r[14] +
          '</em></strong>' +
          r[15] +
          '<strong><em>' +
          r[16] +
          '</em></strong>' +
          r[17] +
          '<strong><em>' +
          r[18] +
          '</em></strong>' +
          r[19] +
          '<strong><em>' +
          r[20] +
          '</em></strong>' +
          r[21];
        this.forthPart = r[22];
        this.fifthPart = r[23];
        this.myCv = r[24] + r[25];
      },
    });
  }
  ngOnDestroy(): void {
    this.languageService.unsubscribe(this);
  }

  getElPos() {
    const posViewPort =
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.getBoundingClientRect()
        .y +
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getBoundingClientRect()
        .height;
    const viewPortOffset = scrollY;
    const viewPortHeight = window.innerHeight;
    this.posElementMax = posViewPort + viewPortOffset;
    this.posElementMin = this.posElementMax - viewPortHeight;
    this.posElementMax -= parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue(scriptVar.cssHeaderHeight)
        .split('px')[0]
    );
    this.posElementMax +=
      this.element.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.getBoundingClientRect().height;
  }

  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = '75%';
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateAfterLoaded();
  }

  @HostListener('window:scroll', ['$event'])
  @debounce()
  onScroll() {
    this.updateAfterLoaded();
  }
  updateAfterLoaded() {
    this.preloader.statusAnyLoading.subscribe({
      next: (isAnyLoading) => {
        if (isAnyLoading != null && !isAnyLoading) {
          setTimeout(() => {
            this.getElPos();
            this.updateWidth();
          });
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.updateAfterLoaded();
  }
}
