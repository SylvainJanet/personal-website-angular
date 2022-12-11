import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { Preloaders } from 'src/app/services/preloader/preloader.service';

// https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
@Directive({
  selector: 'img[appImgLoad]',
})
export class ImgLoadDirective implements OnChanges {
  @Input() appImgLoad: Preloaders[] = [];

  constructor(private el: ElementRef, private imageService: ImageService) {
    imageService.imageLoading(el.nativeElement, this.appImgLoad);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['appImgLoad']) {
      this.imageService.imageLoading(this.el.nativeElement, this.appImgLoad);
    }
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
