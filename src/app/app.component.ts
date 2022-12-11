import {
  PreloaderService,
  Preloaders,
} from './services/preloader/preloader.service';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  loader = Preloaders.MAIN;

  constructor(
    public preloader: PreloaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.preloader.hideLoader(this.loader);
    this.cd.detectChanges();
  }
}
