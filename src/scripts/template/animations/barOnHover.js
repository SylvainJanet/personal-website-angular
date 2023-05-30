/**
 * Logic for the appearing line appearing when the user hover some element.
 */
import "../tools/inputDevice.js";
import { logService } from "../logging/logService.js";
import { scriptVar } from "../tools/setUp.js";

let logger = logService.withClassName("barOnHover.js");

/**
 * Get the elements having class line-on-over. Their next siblings should be
 * the element representing the line that will appear on mouseenter and disapear
 * on mouseleave.
 */
let els = document.getElementsByClassName(scriptVar.cssLineOnHoverClass);

/**
 * Get an array of object containing the info on the element that has to be mouseentered,
 * and on the element that will be the line appearing.
 */
const liste = [];
for (let el of els) {
  liste.push({
    clickable: el,
    line: el.nextElementSibling,
  });
}

/**
 * Gets the actual width of an element
 * @param {*} element the element
 * @returns the actual width
 */
function getActualWidth(element) {
  // https://stackoverflow.com/a/32637350
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  // https://stackoverflow.com/a/63622682
  // https://stackoverflow.com/a/29881817
  const rec = element.getBoundingClientRect();
  let width = rec.width;
  const cs = getComputedStyle(element);
  const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const borderX =
    parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
  width -= paddingX + borderX;
  return width;
}

/**
 * Add the appropriate event listener to change the styles of the line elements
 * on either mouseenter/mouseleave (when on desktop). This behaviour doesn't translate
 * exactly well on mobile (when the user stop touching the screen, the mouse isn't
 * leaving the last place the user touched). Thus, touchstart/touchend is more appropriate
 * for mobile.
 */
liste.forEach((x) => {
  if (window.mobileCheck()) {
    x.clickable.addEventListener("touchstart", () => {
      logger.debug("line-on-over touchstart - line should appear");
      const width = getActualWidth(x.clickable);
      x.line.style.width = (75 * width) / 100 + "px";
    });

    x.clickable.addEventListener("touchend", () => {
      logger.debug("line-on-over touchend - line should disappear");
      x.line.style.width = "0%";
    });
  } else {
    x.clickable.addEventListener("mouseenter", () => {
      logger.debug("line-on-over mouseenter - line should appear");
      const width = getActualWidth(x.clickable);
      x.line.style.width = (75 * width) / 100 + "px";
    });

    x.clickable.addEventListener("mouseleave", () => {
      logger.debug("line-on-over mouseleave - line should disappear");
      x.line.style.width = "0%";
    });
  }
});
