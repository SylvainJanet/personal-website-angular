import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { TextService } from 'src/app/services/db/text/text.service';
import { CvSkillBarComponent } from '../cv-skill-bar/cv-skill-bar.component';
import { CommonModule } from '@angular/common';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Component exposing the different skills to be displayed. See
 * {@link CvSkillBarComponent}.
 */
@Component({
  selector: 'app-cv-skills',
  templateUrl: './cv-skills.component.html',
  styleUrls: ['./cv-skills.component.css'],
  standalone: true,
  imports: [CommonModule, CvSkillBarComponent, MatProgressSpinnerModule],
})
export class CvSkillsComponent implements ComponentWithText, OnDestroy {
  /** The main div element of the component. */
  @ViewChild('mainDiv') mainDiv!: ElementRef<HTMLElement>;
  /** Text used for the skill subtitle. */
  skills = of('');
  /** Text used for the java skill. */
  java = of('');
  /** Text used for the csharp skill. */
  csharp = of('');
  /** Text used for the python skill. */
  python = of('');
  /** Text used for the jsts skill. */
  jsts = of('');
  /** Text used for the sql skill. */
  sql = of('');
  /** Text used for the html skill. */
  html = of('');
  /** Text used for the latex skill. */
  latex = of('');
  /** Preloader for texts. */
  loaderTexts = Preloaders.TEXTS;

  /**
   * The skill bar component constructor
   *
   * @param textService The {@link TextService}
   * @param visibleToLoadTextService The {@link VisibleToLoadTextService}
   * @param preloader The {@link PreloaderService}
   */
  constructor(
    private textService: TextService,
    public visibleToLoadTextService: VisibleToLoadTextService,
    public preloader: PreloaderService
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
    this.textService
      .getMulti([
        'skills-title',
        'java-language',
        'csharp-language',
        'python-language',
        'js-ts-language',
        'sql-language',
        'html-language',
        'latex-language',
      ])
      .subscribe((r) => {
        this.skills = of(r[0]);
        this.java = of(r[1]);
        this.csharp = of(r[2]);
        this.python = of(r[3]);
        this.jsts = of(r[4]);
        this.sql = of(r[5]);
        this.html = of(r[6]);
        this.latex = of(r[7]);

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
