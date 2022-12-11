import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

// https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
@Directive({
  selector: '[appImgLoad]',
})
export class ImgLoadDirective {
  @Input() appImgLoad: Preloaders[] = [];

  constructor(private el: ElementRef, private imageService: ImageService) {
    imageService.imageLoading(el.nativeElement, this.appImgLoad);
  }

  @HostListener('load')
  onLoad() {
    this.imageService.imageLoadedOrError(
      this.el.nativeElement,
      this.appImgLoad
    );
  }

  @HostListener('error')
  onError() {
    this.onLoad();
  }
}
