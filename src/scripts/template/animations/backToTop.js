/**
 * Back to top icon logic
 */
import { logService } from "../logging/logService.js";
import { scriptVar } from "../tools/setUp.js";

let logger = logService.withClassName("backToTop.js");

/**
 * On click, remove any event listener and prevent default behaviour so as to not refresh
 * the page. Use window.scrollTo() to scroll smoothly to the top.
 */
document.getElementsByClassName(scriptVar.cssBackToTopClass).item(0).onclick = (
  event
) => {
  event.preventDefault();
  logger.debug("Back to top");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Setup for the class change to have the icon appear dynamically
 */
const trigger = 100;
let backToTopState =
  scrollY > trigger
    ? scriptVar.backToTopVisibleState
    : scriptVar.backToTopInvisibleState;
updateBackToTop();

/**
 * Update the variable backToTopState with the state of the icon
 * depending on the scrollY value.
 * Below a threshold, the icon should be invisible. Once the scrollY
 * value goes over, the icon should be visible.
 */
window.addEventListener("scroll", () => {
  if (scrollY > trigger) {
    if (backToTopState == scriptVar.backToTopInvisibleState) {
      backToTopState = scriptVar.backToTopVisibleState;
      updateBackToTop();
    }
  }
  if (scrollY <= trigger) {
    if (backToTopState == scriptVar.backToTopVisibleState) {
      backToTopState = scriptVar.backToTopInvisibleState;
      updateBackToTop();
    }
  }
});

/**
 * Actual update of the style of the elements according to
 * the state set in backToTopState.
 */
function updateBackToTop() {
  logger.debug(scriptVar.cssBackToTopClass + " icon state update", {
    newstate: backToTopState,
  });
  const el = document
    .getElementsByClassName(scriptVar.cssBackToTopClass)
    .item(0);
  if (backToTopState === scriptVar.backToTopInvisibleState) {
    el.style.opacity = 0;
    el.style.pointerEvents = "none";
  }
  if (backToTopState === scriptVar.backToTopVisibleState) {
    el.style.opacity = 1;
    el.style.pointerEvents = "all";
  }
}
