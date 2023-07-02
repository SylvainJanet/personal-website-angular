import { PreloaderService } from './../preloader/preloader.service';
import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { Preloaders } from '../preloader/preloaders/preloaders';

/**
 * Service used to notify {@link Preloaders} that some images are loading, and
 * that some images are finished loading (whether the image has successfully
 * loaded or an error occured).
 *
 * Inspired by https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * Map used to track the images to the associated {@link Preloaders}, to avoid
   * having a image load multiple times for the same preloader.
   */
  private images: Map<HTMLElement, Map<Preloaders, boolean>> = new Map();
  /** Logger. See {@link LogService} */
  logger: LogService;

  /**
   * Image service constructor
   *
   * @param preloaderService The {@link PreloaderService}
   * @param logService The {@link LogService}
   */
  constructor(
    private preloaderService: PreloaderService,
    logService: LogService
  ) {
    this.logger = logService.withClassName('ImageService');
  }

  /**
   * Notifies {@link Preloaders}, if it hasn't already been done, that an image
   * has to load.
   *
   * @param img The image that has to load
   * @param loaders The {@link Preloaders}
   */
  imageLoading(img: HTMLElement, loaders: Preloaders[]) {
    for (const loader of loaders) {
      if (
        !this.images.has(img) ||
        !this.images.get(img)?.has(loader) ||
        !this.images.get(img)?.get(loader)
      ) {
        if (this.images.get(img)) {
          this.images.get(img)?.set(loader, true);
        } else {
          const mapToSet = new Map<Preloaders, boolean>();
          mapToSet.set(loader, true);
          this.images.set(img, mapToSet);
        }
        this.preloaderService.toLoad(loader, 1);
      }
    }
  }

  /**
   * Notifies {@link Preloaders}, if it hasn't already been done, that an image
   * has loaded.
   *
   * @param img The image that has loaded
   * @param loaders The {@link Preloaders}
   */
  imageLoadedOrError(img: HTMLElement, loaders: Preloaders[]) {
    for (const loader of loaders) {
      if (
        this.images.has(img) &&
        this.images.get(img)?.has(loader) &&
        this.images.get(img)?.get(loader)
      ) {
        this.images.get(img)?.set(loader, false);
        this.preloaderService.loaded(loader, 1);
      }
    }
  }
}
