import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { BehaviorSubject } from 'rxjs';

// https://blog.slinto.sk/angular-http-preloaders-3ee7bd937ee0

export enum Preloaders {
  MAIN = 'MAIN',
  TEXTS = 'TEXTS',
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
  maxQty: Map<Preloaders, number> = new Map<Preloaders, number>();

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
      this.maxQty.set(element as Preloaders, 0);
    });
    this.statusAnyLoading = new BehaviorSubject<boolean | null>(null);
    this.info.set(Preloaders.MAIN, { qtyToLoad: 0, isLoading: true });
  }

  showLoader(loader: Preloaders, qtyToLoad = 0) {
    this.logger.debug('showLoader', loader, qtyToLoad);
    this.info.set(loader, { qtyToLoad, isLoading: true });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
  }

  toLoad(loader: Preloaders, qty: number) {
    this.logger.debug('Loading stuff...', loader, qty);
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty + qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
    this.maxQty.set(loader, (this.maxQty.get(loader) ?? 0) + qty);
    this.logger.debug('Now has to load', newQty);
  }

  loaded(loader: Preloaders, qty: number) {
    this.logger.debug('Stuff has been loaded...', loader, qty);
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty - qty < 0 ? 0 : oldQty - qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);
    this.logger.debug('Still has to load', newQty);
    if (newQty === 0) {
      this.maxQty.set(loader, 0);
      this.hideLoader(loader);
    }
  }

  hideLoader(loader: Preloaders) {
    if (this.info.get(loader)?.qtyToLoad === 0) {
      this.logger.debug('Loading finished - hide loader', loader);
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

  isAnyLoading(...loaders: Preloaders[]) {
    if (loaders.length == 0) {
      for (const iterator of this.info.entries()) {
        if (iterator[1].isLoading) return true;
      }
      return false;
    } else {
      for (const loader of loaders) {
        if (this.info.get(loader)?.isLoading) return true;
      }
      return false;
    }
  }

  getTotalMaxElToLoad(...loaders: Preloaders[]) {
    let res = 0;
    if (loaders.length == 0) {
      for (const iterator of this.maxQty.entries()) {
        res += iterator[1];
      }
    } else {
      for (const loader of loaders) {
        res += this.maxQty.get(loader) ?? 0;
      }
    }
    return res;
  }

  getTotalElToLoad(...loaders: Preloaders[]) {
    let res = 0;
    if (loaders.length == 0) {
      for (const iterator of this.info.entries()) {
        res += iterator[1].qtyToLoad;
      }
    } else {
      for (const loader of loaders) {
        res += this.info.get(loader)?.qtyToLoad ?? 0;
      }
    }
    return res;
  }

  getProgessionPercent(...loaders: Preloaders[]) {
    const res =
      (this.getTotalElToLoad(...loaders) /
        this.getTotalMaxElToLoad(...loaders)) *
      100;
    return 100 - res;
  }
}
