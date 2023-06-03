import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { debounce } from 'src/scripts/tools/debounce';

@Component({
  selector: 'app-cv-skill-bar',
  templateUrl: './cv-skill-bar.component.html',
  styleUrls: ['./cv-skill-bar.component.css'],
})
export class CvSkillBarComponent implements AfterViewInit {
  @Input() skillName = 'SKILL';
  @Input() percent = 50;
  width = '0';
  preloader: PreloaderService;
  element: ElementRef;
  posElementMin = 0;
  posElementMax = 0;

  constructor(
    preloaderService: PreloaderService,
    logService: LogService,
    elRef: ElementRef
  ) {
    this.element = elRef;
    this.preloader = preloaderService;
  }

  getElPos() {
    const posViewPort =
      this.element.nativeElement.getBoundingClientRect().y +
      this.element.nativeElement.firstElementChild.firstElementChild.getBoundingClientRect()
        .height +
      parseInt(
        getComputedStyle(
          this.element.nativeElement.firstElementChild.firstElementChild
        ).marginTop
      ) +
      parseInt(
        getComputedStyle(
          this.element.nativeElement.firstElementChild.firstElementChild
        ).marginBottom
      );
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
      this.element.nativeElement.firstElementChild.firstElementChild.nextElementSibling.getBoundingClientRect().height;
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.updateAfterLoaded();
  }

  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = this.percent + '%';
    }
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

  @HostListener('window:scroll', ['$event'])
  @debounce()
  onScroll() {
    this.updateAfterLoaded();
  }

  ngAfterViewInit(): void {
    this.updateAfterLoaded();
  }
}
