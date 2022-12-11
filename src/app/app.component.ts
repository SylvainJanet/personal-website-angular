import { environment } from './../environments/environment';
import {
  PreloaderService,
  Preloaders,
} from './services/preloader/preloader.service';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  loader = Preloaders.MAIN;
  env = environment;

  constructor(
    public preloader: PreloaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.preloader.hideLoader(this.loader);
    this.cd.detectChanges();
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
}
