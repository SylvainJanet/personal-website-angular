import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

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
  logger: LogService;
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
    this.logger = logService.withClassName('CvSkillBarComponent');
  }

  getElPos() {
    const posViewPort = this.element.nativeElement.getBoundingClientRect().y;
    const viewPortOffset = scrollY;
    const viewPortHeight = window.innerHeight;
    this.posElementMax = posViewPort + viewPortOffset;
    this.posElementMin = this.posElementMax - viewPortHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getElPos();
    this.updateWidth();
  }

  updateWidth() {
    if (scrollY < this.posElementMin || scrollY > this.posElementMax) {
      this.width = '0';
    } else {
      this.width = this.percent + '%';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.preloader.statusAnyLoading.subscribe({
      next: (isAnyLoading) => {
        if (isAnyLoading != null && !isAnyLoading) {
          this.logger.log('Page is loaded : progress bar width can be changed');
          setTimeout(() => {
            this.getElPos();
            this.updateWidth();
          });
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.logger.log('Waiting for page to finish loading');
    this.getElPos();
    this.preloader.statusAnyLoading.subscribe({
      next: (isAnyLoading) => {
        if (isAnyLoading != null && !isAnyLoading) {
          this.logger.log('Page is loaded : progress bar width can be changed');
          setTimeout(() => {
            this.getElPos();
            this.updateWidth();
          });
        }
      },
    });
  }
}
