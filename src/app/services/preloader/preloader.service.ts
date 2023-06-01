import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

// https://blog.slinto.sk/angular-http-preloaders-3ee7bd937ee0

export enum Preloaders {
  MAIN = 'MAIN',
}

interface LoadingInfo {
  qtyToLoad: number;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  info: Map<Preloaders, LoadingInfo> = new Map<Preloaders, LoadingInfo>();
  statusLoading: Map<Preloaders, BehaviorSubject<boolean | null>> = new Map<
    Preloaders,
    BehaviorSubject<boolean | null>
  >();
  statusAnyLoading: BehaviorSubject<boolean | null>;
  logger: LogService;

  constructor(logService: LogService) {
    this.logger = logService.withClassName('PreloaderService');
    Object.keys(Preloaders).forEach((element) => {
      this.info.set(element as Preloaders, {
        qtyToLoad: 0,
        isLoading: false,
      });
      this.statusLoading.set(
        element as Preloaders,
        new BehaviorSubject<boolean | null>(null)
      );
    });
    this.statusAnyLoading = new BehaviorSubject<boolean | null>(null);
    this.info.set(Preloaders.MAIN, { qtyToLoad: 0, isLoading: true });
  }

  showLoader(loader: Preloaders, qtyToLoad = 0) {
    this.logger.log('showLoader', loader, qtyToLoad);
    this.info.set(loader, { qtyToLoad, isLoading: true });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
  }

  toLoad(loader: Preloaders, qty: number) {
    this.logger.log('Loading stuff...', loader, qty);
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty + qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
    this.logger.log('Now has to load', newQty);
  }

  loaded(loader: Preloaders, qty: number) {
    this.logger.log('Stuff has been loaded...', loader, qty);
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty - qty < 0 ? 0 : oldQty - qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
    this.logger.log('Still has to load', newQty);
    if (newQty === 0) {
      this.hideLoader(loader);
    }
  }

  hideLoader(loader: Preloaders) {
    if (this.info.get(loader)?.qtyToLoad === 0) {
      this.logger.log('Loading finished - hide loader', loader);
      this.info.set(loader, { qtyToLoad: 0, isLoading: false });
      this.statusLoading.get(loader)?.next(false);
      this.statusAnyLoading.next(true);
      let anyLoading = false;
      Object.keys(Preloaders).forEach((element) => {
        if (this.info.get(element as Preloaders)?.isLoading) {
          anyLoading = true;
        }
      });
      if (!anyLoading) {
        this.statusAnyLoading.next(false);
      }
    }
  }

  isLoading(loader: Preloaders) {
    return this.info.get(loader)?.isLoading ?? false;
  }
}
