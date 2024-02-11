import { Languages } from './languages';

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

/** Locale enumeration. Dictionnary mapping every language to its locale. */
export const locales: EnumDictionary<Languages, string> = {
  [Languages.FRENCH]: 'fr-FR',
  [Languages.ENGLISH]: 'en-US',
};
