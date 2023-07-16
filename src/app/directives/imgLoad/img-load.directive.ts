import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';

/**
 * Directive used to indicate that the app should track the loading of the
 * images the directive is applied to, and tie their loading to a set of
 * preloaders given as input.
 *
 * Inspired by https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
 *
 * For instance, using
 *
 * @example
 *   <img [appImgLoad]="myPreloaderArray" ...\>
 *
 *   will result in having every preloaders in `myPreloaderArray` take into account the loading of the image. See {@link Preloaders} for more info.
 */
@Directive({
  selector: 'img[appImgLoad]',
})
export class ImgLoadDirective implements OnChanges {
  /** The preloaders used for the image having the directive. */
  @Input() appImgLoad: Preloaders[] = [];
  /**
   * The notification to the preloaders that the image is loading is tied to the
   * injection of a value into the {@link appImgLoad} input. Since that value
   * could be binded and changed at runtime, this boolean tracks whether or not
   * it's the first binding of the value, and more practically if the img
   * already has loaded (or not in case of an error)
   */
  isLoadedOrError = false;

  /**
   * Image loading directive constructor
   *
   * @param elementRef The `ElementRef`
   * @param imageService The {@link ImageService}
   */
  constructor(
    private elementRef: ElementRef,
    private imageService: ImageService
  ) {}

  /**
   * When the directive value is injected, and the array of preloader is ready,
   * notify the {@link ImageService} that the image is now loading.
   *
   * @param changes The `SimpleChanges`
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['appImgLoad'] && !this.isLoadedOrError) {
      this.imageService.imageLoading(
        this.elementRef.nativeElement,
        this.appImgLoad
      );
    }
  }

  /**
   * When the image is loaded, the {@link ImageService} should be notified. In
   * our case, it makes no difference if its actually loaded or if there was an
   * error. In both cases, the ressources fetching process is finished. The
   * function {@link loadOrError} makes the actual call to the
   * {@linkImageService}.
   */
  @HostListener('load')
  onLoad() {
    this.loadOrError();
  }

  /**
   * When the image is not loaded due to an error, the {@link ImageService}
   * should be notified. In our case, it makes no difference if its actually
   * loaded or if there was an error. In both cases, the ressources fetching
   * process is finished. The function {@link loadOrError} makes the actual call
   * to the {@linkImageService}.
   */
  @HostListener('error')
  onError() {
    this.loadOrError();
  }

  /**
   * Makes the actual call to the {@linkImageService} in case the image is
   * either loaded or if there was an error.
   */
  loadOrError() {
    if (!this.isLoadedOrError) {
      this.isLoadedOrError = true;
      this.imageService.imageLoadedOrError(
        this.elementRef.nativeElement,
        this.appImgLoad
      );
    }
  }
}
