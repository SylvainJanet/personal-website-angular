import { currentDictionnary } from "../messages/dictionnaries.js";
import { logService } from "../logging/logService.js";
import { scriptVar } from "../tools/setUp.js";

let logger = logService.withClassName("textAnimated.js"); // not used to avoid excessive logging

/**
 * Animate the text to make it appear and disappear as if it was
 * typed and erased.
 */

(() => {
  /**
   * Setup used. Could be tweeked. For now works only for one element of
   * class text-animated, with one set of words to animate. Could easily be
   * more general if needed.
   */
  const animatedElement = document
    .getElementsByClassName("text-animated")
    .item(0);
  const typingSpeed = scriptVar.animationTextTypingSpeed;
  const deletionSpeed = scriptVar.animationTextDeletionSpeed;
  const deleteDelay = scriptVar.animationTextDeleteDelay;
  const blinkWidth = scriptVar.animationTextBlinkWidth;

  /**
   * Get the words to display animated. Usefull to call after each word in case
   * the dictionnary is change mid animation : hence, the next word to animate
   * will be of the proper language.
   * @returns the words to animate
   */
  function getWords() {
    let currentDict = currentDictionnary();
    let words = [
      currentDict["mainsubtitle1"],
      currentDict["mainsubtitle2"],
      currentDict["mainsubtitle3"],
      currentDict["mainsubtitle4"],
    ];
    return words;
  }

  /**
   * Index of the current word being animated.
   */
  let i = 0;

  /**
   * Animate the typing : display caracter after character.
   * Once the entire word is displayed, call deletingEffect()
   * to delete it.
   * Always start by a call to getWords() : before any word is
   * anymated, fetch them to take into account a possible language
   * change.
   */
  function typingEffect() {
    let words = getWords();
    const word = words[i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        animatedElement.innerHTML += word.shift();
      } else {
        setTimeout(() => {
          deletingEffect(words);
        }, deleteDelay);
        return;
      }
      setTimeout(loopTyping, typingSpeed);
    };
    loopTyping();
  }

  /**
   * Animate the deletion of a word. Remove one character
   * at a time. When the entire word is removed, call
   * typingEffect() after having updated i with the proper
   * value, i.e. having determined the index of the next word
   * to be animated.
   * @param {} words the list of everyword to be animated
   */
  function deletingEffect(words) {
    const word = words[i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        animatedElement.innerHTML = word.join("");
      } else {
        i = words.length > i + 1 ? i + 1 : 0;
        typingEffect();
        return;
      }
      setTimeout(loopDeleting, deletionSpeed);
    };
    loopDeleting();
  }

  /**
   * Dynamically create and add the cursor element to the page.
   */
  const cursor = document.createElement("span");
  cursor.style.borderRightWidth = blinkWidth;
  cursor.classList.add(scriptVar.animationTextBlinkClass);
  animatedElement.parentElement.appendChild(cursor);

  typingEffect();
})();
