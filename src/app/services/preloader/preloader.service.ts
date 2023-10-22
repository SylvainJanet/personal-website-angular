import { Injectable } from '@angular/core';
import { LogService } from '../log/log.service';
import { BehaviorSubject } from 'rxjs';
import { LoadingInfo } from './loadingInfo/loadingInfo';
import { Preloaders } from './preloaders/preloaders';

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
   * Previous max quantity stored. Usefull when a preloader has finished loading
   * (hence the max quantity is set to 0) but other preloars haven't. If we want
   * to know the progression along all preloaders, we use this map to get the
   * old max total. Other wise, the total pourcentage would jump back a bit each
   * time a preloader finishes loading.
   */
  oldMaxQty: Map<Preloaders, number> = new Map<Preloaders, number>();

  /**
   * Loading message. Emits when something has to load as well as when something
   * as loaded.
   */
  loadingMessage: BehaviorSubject<string>;

  /**
   * Whether or not the entire app is loading. Usefull when first loading the
   * app, but also on language change for instance.
   */
  isMainLoad = true;

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
      this.oldMaxQty.set(element as Preloaders, 0);
    });

    this.statusAnyLoading = new BehaviorSubject<boolean | null>(null);
    this.loadingMessage = new BehaviorSubject<string>('');
  }

  /**
   * Set up a given {@link Preloaders} with an amount of data to load.
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   * @param message The preloader message
   * @param withPreloaderTot If the pourcentage for the preloader should be
   *   displayed in the message
   * @param withTot If the total pourcentage should be displayed in the message
   * @returns The message
   */
  toLoad(
    loader: Preloaders,
    qty: number,
    message = '',
    withPreloaderTot = true,
    withTot = true
  ): string {
    const oldQty = this.info.get(loader)?.qtyToLoad as number;
    const newQty = oldQty + qty;

    this.info.set(loader, { isLoading: true, qtyToLoad: newQty });

    this.statusLoading.get(loader)?.next(true);
    this.statusAnyLoading.next(true);

    this.maxQty.set(loader, (this.maxQty.get(loader) as number) + qty);
    this.oldMaxQty.set(loader, this.maxQty.get(loader) as number);

    if (!message) message = this.defaultToLoadMessage(loader, qty);
    message = this.formatMessage(message, loader, withPreloaderTot, withTot);
    return message;
  }

  /**
   * Default to load message, if none is specified
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   * @returns The message
   */
  private defaultToLoadMessage(loader: Preloaders, qty: number): string {
    const message = 'LOADING... ' + loader + ' - ' + qty;
    return message;
  }

  /**
   * Default loaded message, if none is specified
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   * @returns The message
   */
  private defaultLoadedMessage(loader: Preloaders, qty: number): string {
    const message = 'LOADED... ' + loader + ' - ' + qty;
    return message;
  }

  /**
   * Format the message to be emitted.
   *
   * @param message The preloader message
   * @param loader The {@link Preloaders}
   * @param withPreloaderTot If the pourcentage for the preloader should be
   *   displayed in the message
   * @param withTot If the total pourcentage should be displayed in the message
   * @returns The message
   */
  formatMessage(
    message: string,
    loader: Preloaders,
    withPreloaderTot = true,
    withTot = true
  ): string {
    const loaderProgress = +this.getProgressionPercent(loader).toFixed(2);
    const totProgress = +this.getProgressionPercent().toFixed(2);
    this.logger.debug(message, loaderProgress + '%', totProgress + '%');
    if (withPreloaderTot) {
      message = message + ' - ' + loaderProgress + '%';
    }
    if (withTot) {
      message =
        message + ' (' + +this.getProgressionPercent().toFixed(2) + '%)';
    }
    this.loadingMessage.next(message);
    return message;
  }

  /**
   * Call when an amount of data has been loaded for a given {@link Preloaders}
   *
   * @param loader The {@link Preloaders}
   * @param qty The quantity
   * @param message The preloader message
   * @param withPreloaderTot If the pourcentage for the preloader should be
   *   displayed in the message
   * @param withTot If the total pourcentage should be displayed in the message
   */
  loaded(
    loader: Preloaders,
    qty: number,
    message = '',
    withPreloaderTot = true,
    withTot = true
  ) {
    const oldQty = this.info.get(loader)?.qtyToLoad as number;

    if (oldQty - qty < 0) {
      this.logger.warn(
        'More data was loaded than expected for the preloader ',
        loader
      );
    }
    const newQty = oldQty - qty < 0 ? 0 : oldQty - qty;

    if (newQty !== 0) {
      this.info.set(loader, { isLoading: true, qtyToLoad: newQty });
      if (!message) message = this.defaultLoadedMessage(loader, qty);
      message = this.formatMessage(message, loader, withPreloaderTot, withTot);
      return;
    }

    this.maxQty.set(loader, 0);
    this.info.set(loader, { isLoading: false, qtyToLoad: 0 });
    this.statusLoading.get(loader)?.next(false);

    if (!this.isAnyLoading()) {
      this.isMainLoad = false;
      this.statusAnyLoading.next(false);

      for (const entry of this.oldMaxQty.entries()) {
        this.oldMaxQty.set(entry[0], 0);
      }
    }

    if (!message) message = this.defaultLoadedMessage(loader, qty);
    message = this.formatMessage(message, loader, withPreloaderTot, withTot);
  }

  /**
   * Returns whether or not a given {@link Preloaders} is loading.
   *
   * @param loader The {@link Preloaders}
   * @returns If he {@link Preloaders} is loading
   */
  isLoading(loader: Preloaders) {
    return this.info.get(loader)?.isLoading as boolean;
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
      if (res == 0) return res;
      res = 0;
      for (const iterator of this.oldMaxQty.entries()) {
        res += iterator[1];
      }
    } else {
      for (const loader of loaders) {
        res += this.maxQty.get(loader) as number;
      }
      if (res == 0) return res;
      res = 0;
      for (const loader of loaders) {
        res += this.oldMaxQty.get(loader) as number;
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
        res += this.info.get(loader)?.qtyToLoad as number;
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
  getProgressionPercent(...loaders: Preloaders[]) {
    const maxElToLoad = this.getTotalMaxElToLoad(...loaders);
    if (maxElToLoad === 0) return 100;

    const totalElToLoad = this.getTotalElToLoad(...loaders);

    const res = (totalElToLoad / maxElToLoad) * 100;
    return 100 - res;
  }
}
