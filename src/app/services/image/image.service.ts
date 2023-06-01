import { Preloaders, PreloaderService } from './../preloader/preloader.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from '../log/log.service';

// https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1

export interface LoadingImages {
  loader: Preloaders;
  nbr: number;
}
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private _imagesLoading = new Subject<LoadingImages>();
  private images: Map<HTMLElement, Map<Preloaders, boolean>> = new Map();
  private imagesLoading: Map<Preloaders, number> = new Map();

  imagesLoading$ = this._imagesLoading.asObservable();

  logger: LogService;

  constructor(
    private preloaderService: PreloaderService,
    logService: LogService
  ) {
    this.logger = logService.withClassName('ImageService');
  }

  imageLoading(img: HTMLElement, loaders: Preloaders[]) {
    this.logger.log(
      'Logging image',
      img.getAttribute('src'),
      'for loaders',
      loaders
    );
    for (const loader of loaders) {
      if (
        !this.images.has(img) ||
        this.images.get(img)?.has(loader) ||
        this.images.get(img)?.get(loader)
      ) {
        const mapToSet = this.images.get(img) ?? new Map<Preloaders, boolean>();
        mapToSet.set(loader, false);
        this.images.set(img, mapToSet);
        this.imagesLoading.set(
          loader,
          (this.imagesLoading.get(loader) ?? 0) + 1
        );
        this._imagesLoading.next({
          loader,
          nbr: this.imagesLoading.get(loader) ?? 0,
        });
        this.preloaderService.toLoad(loader, 1);
      }
    }
  }

  imageLoadedOrError(img: HTMLElement, loaders: Preloaders[]) {
    this.logger.log(
      'Image has been loaded',
      img.getAttribute('src'),
      'for loaders',
      loaders
    );
    for (const loader of loaders) {
      if (
        this.images.has(img) &&
        this.images.get(img)?.has(loader) &&
        !this.images.get(img)?.get(loader)
      ) {
        const mapToSet = this.images.get(img) ?? new Map<Preloaders, boolean>();
        mapToSet.set(loader, true);
        this.images.set(img, mapToSet);
        this.imagesLoading.set(
          loader,
          (this.imagesLoading.get(loader) ?? 1) - 1
        );
        this._imagesLoading.next({
          loader,
          nbr: this.imagesLoading.get(loader) ?? 0,
        });
        this.preloaderService.loaded(loader, 1);
      }
    }
  }
}
