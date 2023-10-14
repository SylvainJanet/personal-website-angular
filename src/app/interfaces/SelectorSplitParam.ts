/**
 * Interface used for a parameter : when calling the API for multiple selectors,
 * describe whether or not the result should be split. See {@link TextService}.
 */
export interface SelectorSplitParam {
  /** The selector */
  selector: string;
  /** Whether or not the text should be split */
  isSplit: boolean;
}
