import { Injectable } from '@angular/core';

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

  constructor() {
    Object.keys(Preloaders).forEach((element) => {
      this.info.set(element as Preloaders, {
        qtyToLoad: 0,
        isLoading: false,
      });
    });
    this.info.set(Preloaders.MAIN, { qtyToLoad: 0, isLoading: true });
  }

  showLoader(loader: Preloaders, qtyToLoad = 0) {
    this.info.set(loader, { qtyToLoad, isLoading: true });
  }

  toLoad(loader: Preloaders, qty: number) {
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty + qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
  }

  loaded(loader: Preloaders, qty: number) {
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty - qty < 0 ? 0 : oldQty - qty;
    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
    if (newQty === 0) {
      this.hideLoader(loader);
    }
  }

  hideLoader(loader: Preloaders) {
    if (this.info.get(loader)?.qtyToLoad === 0)
      this.info.set(loader, { qtyToLoad: 0, isLoading: false });
  }

  isLoading(loader: Preloaders) {
    return this.info.get(loader)?.isLoading ?? false;
  }
}
