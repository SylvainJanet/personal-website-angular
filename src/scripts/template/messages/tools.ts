import { supportedLanguages } from './dictionnaries';
import { logService } from '../logging/logService';

let logger = logService.withClassName('tools.js');

/**
 * Checks that every key in the english dictionnary is also
 * a key in every other dictionnaries.
 * Mainly to provide a simple way to avoid typos or
 * small mistakes that would be otherwise difficult to detect.
 * @param {*} englishDict the english dictionnary
 * @param {*} dictionnaries the dictionnaries
 */
function checkEveryMessageIsTranslatedInEveryLanguage(
  englishDict: any,
  dictionnaries: any
) {
  for (const id in englishDict) {
    for (const dict in dictionnaries) {
      if (!dictionnaries[dict][id]) {
        logger.warn('some messages may not be translated in every language', {
          language: supportedLanguages[dict],
          message: id,
        });
      }
    }
  }
  logger.debug('Messages translated checked');
}

/**
 * Checks that the keys of the supportedLanguages object and
 * of the dictionnaries object are the same.
 * Mainly to provide a simple way to avoid typos or
 * small mistakes that would be otherwise difficult to detect.
 * @param {*} supportedLanguages the supportedLanguages object
 * @param {*} dictionnaries the dictionnaries
 */
function checkSupportedLanguagesActuallySupported(
  supportedLanguages: any,
  dictionnaries: any
) {
  for (const key in supportedLanguages) {
    if (!dictionnaries[key])
      logger.warn('A dictionnary is missing', {
        missingLanguage: supportedLanguages[key],
      });
  }
  for (const key in dictionnaries) {
    if (!supportedLanguages[key])
      logger.warn('A supported language is not indicated', {
        languageNotIndicated: key,
      });
  }
  logger.debug('Supported languages checked');
}

/**
 * In case some messages requires another strategy than changing the innerText value
 * of an element, list other possibleTypes, and recording the keys that have other
 * strategies along with said other strategy types.
 */
let textType: any = {
  // backHome: "input",
  tokiPonaHome: 'input',
};

let possibleTypes = ['input'];

/**
 * Checks that every value of properties of the textType object is
 * part of the possibleTypes array.
 * Mainly to provide a simple way to avoid typos or
 * small mistakes that would be otherwise difficult to detect.
 */
(function checkOnlyPossibleTypes() {
  for (const key in textType) {
    if (!possibleTypes.includes(textType[key])) {
      logger.warn('A text type might be mistyped', { type: textType[key] });
    }
  }
  logger.debug('Possible types checked');
})();

/**
 * Checks that every value of properties of the textType object is
 * an actual key of the dictionnary.
 * Mainly to provide a simple way to avoid typos or
 * small mistakes that would be otherwise difficult to detect.
 * @param {*} dictionnary the dictionnary
 */
function checkEveryTextTypeAppears(dictionnary: any) {
  for (const key in textType) {
    if (!Object.keys(dictionnary).includes(key)) {
      logger.warn("A text type doesn't appear in dictionnaries", {
        textType: key,
      });
    }
  }
  logger.debug('Text types checked');
}

export {
  checkEveryMessageIsTranslatedInEveryLanguage,
  checkSupportedLanguagesActuallySupported,
  textType,
  checkEveryTextTypeAppears,
};
