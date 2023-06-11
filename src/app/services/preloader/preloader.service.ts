import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { BehaviorSubject } from 'rxjs';

/** Preloaders */
export enum Preloaders {
  MAIN = 'MAIN',
  TEXTS = 'TEXTS',
}

/** Loading information */
interface LoadingInfo {
  /** Quantity to load */
  qtyToLoad: number;
  /** Is it loading */
  isLoading: boolean;
}

/**
 * Preloader service, used to manage asset loading, so that the app may display
 * animations while the data loads. Multiple preloaders can be responsible for
 * the loading of different data, and any data can be associated with multiple
 * preloaders. Inspired by
 * https://blog.slinto.sk/angular-http-preloaders-3ee7bd937ee0
 */
@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  /**
   * Tracks how many elements are loading for each preloader and if each
   * preloader is loading at all
   */
  info: Map<Preloaders, LoadingInfo> = new Map<Preloaders, LoadingInfo>();
  /**
   * Maps every preloader to an observable, that will emit a boolean
   * corresponding to whether or not the preloader is loading or not.
   */
  statusLoading: Map<Preloaders, BehaviorSubject<boolean | null>> = new Map<
    Preloaders,
    BehaviorSubject<boolean | null>
  >();
  /**
   * Observable that will emit a boolean corresponding to whether or not any
   * preloader is loading.
   */
  statusAnyLoading: BehaviorSubject<boolean | null>;
  /** Logger. See {@link LogService} */
  logger: LogService;
  /** Max quantity to load for each preloader. */
  maxQty: Map<Preloaders, number> = new Map<Preloaders, number>();

  /**
   * Preloader service constructor.
   *
   * @param logService The {@link LogService}
   */
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
  }

  /**
   * Set up a given {@link Preloaders} with an amount of data to load.
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   */
  toLoad(loader: Preloaders, qty: number) {
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;
    const newQty = oldQty + qty;

    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });

    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);

    this.maxQty.set(loader, (this.maxQty.get(loader) ?? 0) + qty);
  }

  /**
   * Call when an amount of data has been loaded for a given {@link Preloaders}
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   */
  loaded(loader: Preloaders, qty: number) {
    const oldQty = this.info.get(loader)?.qtyToLoad ?? 0;

    if (oldQty - qty < 0) {
      this.logger.warn(
        'More data was loaded than expected for the preloader ',
        loader
      );
    }
    const newQty = oldQty - qty < 0 ? 0 : oldQty - qty;

    if (newQty !== 0) {
      this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
      return;
    }

    this.maxQty.set(loader, 0);
    this.info.set(loader, { isLoading: false, qtyToLoad: 0 });
    this.statusLoading.get(loader)?.next(false);

    if (!this.isAnyLoading()) {
      this.statusAnyLoading.next(false);
    }
  }

  /**
   * Returns whether or not a given {@link Preloaders} is loading.
   *
   * @param loader The {@link Preloaders}
   * @returns If he {@link Preloaders} is loading
   */
  isLoading(loader: Preloaders) {
    return this.info.get(loader)?.isLoading ?? false;
  }

  /**
   * Checks if any {@link Preloaders} is loading. If nothing is given as input,
   * it checks for every existing {@link Preloaders}, otherwise it checks for the
   * {@link Preloaders} given as input.
   *
   * @param loaders The {@link Preloaders} to check
   * @returns If any {@link Preloaders} is loading
   */
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

  /**
   * Get the total max elements to load for every {@link Preloaders}.If nothing
   * is given as input, it checks for every existing {@link Preloaders},
   * otherwise it checks for the {@link Preloaders} given as input.
   *
   * @param loaders The {@link Preloaders} to check
   * @returns The max number of elements to load
   */
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

  /**
   * Get the total number of elements still having to load for every
   * {@link Preloaders}.If nothing is given as input, it checks for every
   * existing {@link Preloaders}, otherwise it checks for the {@link Preloaders}
   * given as input.
   *
   * @param loaders The {@link Preloaders} to check
   * @returns The total number of elements still having to load
   */
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

  /**
   * Get the progression percentage for {@link Preloaders}.If nothing is given as
   * input, it computes the value taking into account every existing
   * {@link Preloaders}, otherwise it does only for the {@link Preloaders} given
   * as input.
   *
   * @param loaders The {@link Preloaders}
   * @returns The progression percentage
   */
  getProgessionPercent(...loaders: Preloaders[]) {
    const res =
      (this.getTotalElToLoad(...loaders) /
        this.getTotalMaxElToLoad(...loaders)) *
      100;
    return 100 - res;
  }
}
