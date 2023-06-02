import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { TestService } from 'src/app/services/db/test/test.service';
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
  testDbrealPorthttps = '';
  testDbrealhttps = '';
  testDbrealdevPorthttps = '';
  testDbrealdevhttps = '';

  constructor(
    preloaderService: PreloaderService,
    elRef: ElementRef,
    private testService: TestService,
    private httpClient: HttpClient
  ) {
    this.element = elRef;
    this.preloader = preloaderService;
  }

  ngOnInit(): void {
    console.log('ngOnInit : API call');
    this.testService.hello().subscribe({
      next: (m) => (this.message = m),
    });

    this.httpClient.get('http://localhost:8080/hello').subscribe({
      next: () => (this.testDblocal = 'Local backend OK'),
      error: () => (this.testDblocal = 'Local backend not accessed'),
    });

    this.httpClient
      .get('https://server.sylvainjanet.fr:8443/test/hello')
      .subscribe({
        next: () =>
          (this.testDbrealPorthttps =
            'Real backend with adress and port OK - https'),
        error: () =>
          (this.testDbrealPorthttps =
            'Real backend not accessed with adress and port - https'),
      });

    this.httpClient.get('https://server.sylvainjanet.fr/test/hello').subscribe({
      next: () =>
        (this.testDbrealhttps = 'Real backend with adress OK - https'),
      error: () =>
        (this.testDbrealhttps =
          'Real backend not accessed with adress - https'),
    });

    this.httpClient
      .get('https://server.sylvainjanet.fr:8443/test-dev/hello')
      .subscribe({
        next: () =>
          (this.testDbrealdevPorthttps =
            'Real dev backend with adress and port OK - https'),
        error: () =>
          (this.testDbrealdevPorthttps =
            'Real dev backend not accessed with adress and port - https'),
      });

    this.httpClient
      .get('https://server.sylvainjanet.fr/test-dev/hello')
      .subscribe({
        next: () =>
          (this.testDbrealdevhttps = 'Real dev backend with adress OK - https'),
        error: () =>
          (this.testDbrealdevhttps =
            'Real dev backend not accessed with adress - https'),
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
