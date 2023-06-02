import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { TestService } from 'src/app/services/db/test/test.service';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cv-about-me',
  templateUrl: './cv-about-me.component.html',
  styleUrls: ['./cv-about-me.component.css'],
})
export class CvAboutMeComponent implements AfterViewInit, OnInit {
  width = '0';
  posElementMin = 0;
  posElementMax = 0;
  preloader: PreloaderService;
  element: ElementRef;
  env = environment;
  message = '';
  testDblocal = '';
  testDbtestlocal = '';
  testDbrealhttps = '';
  testDbrealdevhttps = '';
  logger: LogService;

  constructor(
    preloaderService: PreloaderService,
    elRef: ElementRef,
    private testService: TestService,
    private httpClient: HttpClient,
    logService: LogService
  ) {
    this.element = elRef;
    this.preloader = preloaderService;
    this.logger = logService.withClassName('CvAboutMeComponent');
  }

  ngOnInit(): void {
    console.log('ngOnInit : API call');
    this.testService.hello().subscribe({
      next: (m) => (this.message = m),
    });

    this.httpClient
      .get('http://localhost:8080/hello', {
        responseType: 'text',
      })
      .subscribe({
        next: (m) => (this.testDblocal = 'Local backend OK - ' + m),
        error: (e) => {
          this.testDblocal = 'Local backend not accessed';
          this.logger.error('Erreur', e);
        },
      });

    this.httpClient
      .get('http://localhost:8080/hello', {
        responseType: 'text',
      })
      .subscribe({
        next: (m) => (this.testDbtestlocal = 'Local backend test OK - ' + m),
        error: (e) => {
          this.testDbtestlocal = 'Local backend test not accessed';
          this.logger.error('Erreur', e);
        },
      });

    this.httpClient
      .get('https://server.sylvainjanet.fr/test/hello', {
        responseType: 'text',
      })
      .subscribe({
        next: (m) =>
          (this.testDbrealhttps = 'Real backend with adress OK - https - ' + m),
        error: (e) => {
          this.testDbrealhttps =
            'Real backend not accessed with adress - https';
          this.logger.error('Erreur', e);
        },
      });

    this.httpClient
      .get('https://server.sylvainjanet.fr/test-dev/hello', {
        responseType: 'text',
      })
      .subscribe({
        next: (m) =>
          (this.testDbrealdevhttps =
            'Real dev backend with adress OK - https - ' + m),
        error: (e) => {
          this.testDbrealdevhttps =
            'Real dev backend not accessed with adress - https';
          this.logger.error('Erreur', e);
        },
      });
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
  }

  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = '75%';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getElPos();
    this.updateWidth();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
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
    this.getElPos();
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
}
