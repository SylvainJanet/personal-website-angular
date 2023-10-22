import { PreloaderService } from './../preloader/preloader.service';
import { Inject, Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { Preloaders } from '../preloader/preloaders/preloaders';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

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
    logService: LogService,
    @Inject(ENV) private environment: IEnvironment
  ) {
    this.logger = logService.withClassName('ImageService');
  }

  /**
   * Default to load message, if none is specified
   *
   * @param img The image that has to load
   * @param loaders The {@link Preloaders}
   * @returns The message
   */
  private imgToLoadMessage(img: HTMLElement, loaders: Preloaders[]): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const src = (
        img.getAttribute('src') ? img.getAttribute('src') : 'no file'
      ) as string;
      const split = src.split('/');
      const fileName = split[split.length - 1];
      return 'Loading img - ' + fileName + ' - ' + loaders;
    }
    return 'Loading image...';
  }

  /**
   * Default loaded message, if none is specified
   *
   * @param img The image that has to load
   * @param loaders The {@link Preloaders}
   * @returns The message
   */
  private imgLoadedMessage(img: HTMLElement, loaders: Preloaders[]): string {
    if (!this.environment.production && this.environment.fullLoadingMessages) {
      const src = (
        img.getAttribute('src') ? img.getAttribute('src') : 'no file'
      ) as string;
      const split = src.split('/');
      const fileName = split[split.length - 1];
      return 'Img loaded - ' + fileName + ' - ' + loaders;
    }
    return 'Loading image...';
  }

  /**
   * Whether or not the preloader tot included in the preloader message.
   *
   * @returns The boolean
   */
  private imgMessageWithPreloaderTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
  }
  /**
   * Whether or not the preloader tot included in the message for the totality
   * of preloaders.
   *
   * @returns The boolean
   */
  private imgMessageWithTot(): boolean {
    return !this.environment.production && this.environment.fullLoadingMessages;
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
        this.preloaderService.toLoad(
          loader,
          1,
          this.imgToLoadMessage(img, loaders),
          this.imgMessageWithPreloaderTot(),
          this.imgMessageWithTot()
        );
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
        let timeout = 1;
        if (!this.environment.production && !this.environment.isTesting)
          timeout =
            Math.random() * this.environment.artificialRandomLoadingTime +
            this.environment.artificialMinLoadingTime +
            1;
        setTimeout(() => {
          this.preloaderService.loaded(
            loader,
            1,
            this.imgLoadedMessage(img, loaders),
            this.imgMessageWithPreloaderTot(),
            this.imgMessageWithTot()
          );
        }, timeout);
      }
    }
  }
}
