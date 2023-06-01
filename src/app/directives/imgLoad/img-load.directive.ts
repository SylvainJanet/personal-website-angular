import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { LogService } from 'src/app/services/log/log.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

// https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
@Directive({
  selector: 'img[appImgLoad]',
})
export class ImgLoadDirective implements OnChanges {
  @Input() appImgLoad: Preloaders[] = [];
  elementRef: ElementRef;
  logger: LogService;

  constructor(
    private el: ElementRef,
    private imageService: ImageService,
    logService: LogService
  ) {
    this.elementRef = el;
    this.logger = logService.withClassName('ImgLoadDirective');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['appImgLoad']) {
      this.logger.log('Changes - appImgLoad');
      this.imageService.imageLoading(this.el.nativeElement, this.appImgLoad);
    }
  }

  @HostListener('load')
  onLoad() {
    this.logger.log('load event');
    this.loadOrError();
  }

  @HostListener('error')
  onError() {
    this.logger.log('error event');
    this.loadOrError();
  }

  loadOrError() {
    this.imageService.imageLoadedOrError(
      this.el.nativeElement,
      this.appImgLoad
    );
  }
}
