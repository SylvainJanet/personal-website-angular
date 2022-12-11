import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private destroyed = new Subject<void>();
  bps!: string[];

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe(Object.values(Breakpoints))
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.bps = [];
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.bps.push(query);
          }
        }
      });
  }

  // Breakpoints.Handset
  //   Breakpoints.Tablet,
  //   Breakpoints.Web,
  isSmallOrLess() {
    const acceptedBps: string[] = [
      Breakpoints.HandsetPortrait,
      Breakpoints.Small,
      Breakpoints.TabletPortrait,
      Breakpoints.XSmall,
    ];
    for (const bp of acceptedBps) {
      if (this.bps.includes(bp)) return true;
    }
    return false;
  }

  isMediumOrEquivalent() {
    if (this.isSmallOrLess()) return false;
    const acceptedBps: string[] = [
      Breakpoints.HandsetLandscape,
      Breakpoints.Medium,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
    ];
    for (const bp of acceptedBps) {
      if (this.bps.includes(bp)) return true;
    }
    return false;
  }

  isLargeOrMore() {
    if (this.isSmallOrLess() || this.isMediumOrEquivalent()) return false;
    const acceptedBps: string[] = [
      Breakpoints.Large,
      Breakpoints.WebLandscape,
      Breakpoints.XLarge,
    ];
    for (const bp of acceptedBps) {
      if (this.bps.includes(bp)) return true;
    }
    return false;
  }

  onDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
