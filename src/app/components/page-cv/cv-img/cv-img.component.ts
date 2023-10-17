import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

/** Cv profile picture component containing the photo. */
@Component({
  selector: 'app-cv-img',
  templateUrl: './cv-img.component.html',
  styleUrls: ['./cv-img.component.css'],
  standalone: true,
  imports: [CommonModule, ImgLoadDirective],
})
export class CvImgComponent implements ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
  /** {@link Preloaders} used for the cv profile picture. */
  preloaders = [Preloaders.MAIN];
  /** Alt text of the image. */
  altTxt = of('');

  /**
   * Cv profile picture component constructor
   *
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   */
  constructor(
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService
  ) {
    setTimeout(() => {
      this.visibleToLoadTextService.subscribe(this);
    }, 0);
  }

  /**
   * Update the component's texts when the language is updated. See
   * {@link VisibleToLoadTextService}. The subscriber design pattern is used and
   * this function is used when the service notifies its subscribers to update
   * the text contents after a language change. Uses {@link TextService} to get
   * those contents from the database.
   */
  updateTexts(): void {
    this.textService.get('cv-img-alt').subscribe((v) => {
      this.altTxt = of(v);
      this.visibleToLoadTextService.textLoaded(this);
    });
  }

  /**
   * On destroy, the component has to be unsubscribed rom the
   * {@link VisibleToLoadTextService} to avoid having the service try to notify a
   * destroyed subscriber.
   */
  ngOnDestroy(): void {
    this.visibleToLoadTextService.unsubscribe(this);
  }

  /**
   * Get the main component element.
   *
   * @returns The element.
   */
  getElement(): ElementRef<HTMLElement> {
    return this.mainDiv;
  }
}
