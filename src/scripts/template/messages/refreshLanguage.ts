import { dictionnaries } from './dictionnaries';
import { textType } from './tools';
import { scriptVar } from '../tools/setUp';

/**
 * Decreases opacity of the page from 1 to 0 in N steps at a certain speed.
 * @param {*} i current step. Starts at 0
 * @param {*} N max number of step
 * @param {*} step duration of a step in millisecond
 */
function decreaseOpacity(i: number, N: number, step: number) {
  setTimeout(() => {
    document.getElementsByTagName('html').item(0)!.style.opacity = (
      1 -
      i / (N - 1)
    ).toString();
    if (i < N - 1) {
      decreaseOpacity(i + 1, N, step);
    }
  }, step);
}

/**
 * Increases opacity of the page from 0 to 1 in N steps at a certain speed.
 * @param {*} i current step. Starts at 0
 * @param {*} N max number of step
 * @param {*} step duration of a step in millisecond
 */
function increaseOpacity(i: number, N: number, step: number) {
  setTimeout(() => {
    document.getElementsByTagName('html').item(0)!.style.opacity = (
      i /
      (N - 1)
    ).toString();
    if (i < N - 1) {
      increaseOpacity(i + 1, N, step);
    }
  }, step);
}

/**
 * Refreshes the texts of the page. By default, if the dictionnary key
 * has no textType specified, just change the innerText. Otherwise, it
 * depends on the strategy used.
 * @param {*} language the language
 */
function refreshTexts(language: string) {
  for (const key in dictionnaries[language]) {
    let element = document.getElementById(key);
    if (element) {
      if (!Object.keys(textType).includes(key)) {
        element.innerText = dictionnaries[language][key];
      }
      if (textType[key] === 'input') {
        element.setAttribute('value', dictionnaries[language][key]);
      }
    }
  }
}

/**
 * Refresh the language. The page will possibly fade-out, then
 * the texts will change, and the page will possibly then fade-in again.
 * @param {*} doAnimate should the refresh be during a
 * fade-out/fade-in.
 */
function refreshLanguage(doAnimate: boolean) {
  let duration = scriptVar.refreshLanguageDuration;
  let step = scriptVar.refreshLanguageStep;
  let pauseTime = step * 2;
  let N = Math.ceil(duration / ((2 * step) / 1000));

  if (doAnimate) {
    decreaseOpacity(0, N, step);
  } else {
    duration = 0;
  }

  setTimeout(() => {
    let language = localStorage.getItem(scriptVar.localStorageLanguage);
    if (!language) {
      language = 'en';
    }
    document
      .getElementsByTagName('html')
      .item(0)
      ?.setAttribute('lang', language);

    refreshTexts(language);

    if (doAnimate) {
      setTimeout(() => {
        increaseOpacity(0, N, step);
      }, pauseTime);
    }
  }, (duration / 2) * 1000 + pauseTime);
}

export { refreshLanguage };
