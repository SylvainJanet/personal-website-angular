import { Preloaders, PreloaderService } from './../preloader/preloader.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// https://dev.to/paviad/angular-wait-for-all-images-to-load-3hp1
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private _imagesLoading = new Subject<number>();
  private images: Map<HTMLElement, boolean> = new Map();
  private imagesLoading = 0;

  imagesLoading$ = this._imagesLoading.asObservable();

  constructor(private preloaderService: PreloaderService) {}

  imageLoading(img: HTMLElement, loaders: Preloaders[]) {
    if ((!this.images.has(img) || this.images.get(img)) && loaders) {
      this.images.set(img, false);
      this.imagesLoading++;
      this._imagesLoading.next(this.imagesLoading);
      for (const loader of loaders) {
        this.preloaderService.toLoad(loader, 1);
      }
    }
  }

  imageLoadedOrError(img: HTMLElement, loaders: Preloaders[]) {
    if (this.images.has(img) && !this.images.get(img) && loaders) {
      this.images.set(img, true);
      this.imagesLoading--;
      this._imagesLoading.next(this.imagesLoading);
      for (const loader of loaders) {
        this.preloaderService.loaded(loader, 1);
      }
    }
  }
}
