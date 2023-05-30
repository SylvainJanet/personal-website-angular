import { frenchDict } from './dict/french';
import { englishDict } from './dict/english';
import {
  checkSupportedLanguagesActuallySupported,
  checkEveryMessageIsTranslatedInEveryLanguage,
  checkEveryTextTypeAppears,
} from './tools';

/**
 * Initialises the dictionnaries, the languages, and do the
 * initial checks.
 */
const supportedLanguages: any = { en: 'English', fr: 'French' };
const dictionnaries: any = { en: englishDict, fr: frenchDict };

checkSupportedLanguagesActuallySupported(supportedLanguages, dictionnaries);
checkEveryMessageIsTranslatedInEveryLanguage(englishDict, dictionnaries);
for (const key in dictionnaries) {
  checkEveryTextTypeAppears(dictionnaries[key]);
}

/**
 *
 * @returns the dictionnary corresponding to the current language
 */
function currentDictionnary() {
  let language = localStorage.getItem('language');
  if (!language || language == 'en') {
    return englishDict;
  } else {
    return frenchDict;
  }
}

export { supportedLanguages, dictionnaries, currentDictionnary };
