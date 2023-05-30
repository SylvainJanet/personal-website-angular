/**
 * Header style should change when the user has scrolled enough.
 */
import { logService } from "../logging/logService.js";
import { scriptVar } from "../tools/setUp.js";

let logger = logService.withClassName("headerScroll.js");

/**
 * Setup for the class change to modify the class of the header when scrolling.
 */
const bannerHeight = scriptVar.isBanner
  ? getComputedStyle(document.getElementsByTagName("body").item(0))
      .getPropertyValue(scriptVar.cssBannerHeight)
      .split("px")[0]
  : 0;
const trigger = bannerHeight; // banner height - header height
// so that the threshold corresponds to the end of the banner
let headerState =
  scrollY > trigger ? scriptVar.headerStateLight : scriptVar.headerStateDark;
updateHeader();

/**
 * Update the variable headerState with the state of the header
 * depending on the scrollY value.
 * Below a threshold, the header should be dark. Once the scrollY
 * value goes over, the header should be light.
 */
window.addEventListener("scroll", () => {
  if (scrollY > trigger) {
    if (headerState == scriptVar.headerStateDark) {
      headerState = scriptVar.headerStateLight;
      updateHeader();
    }
  }
  if (scrollY <= trigger) {
    if (headerState == scriptVar.headerStateLight) {
      headerState = scriptVar.headerStateDark;
      updateHeader();
    }
  }
});

/**
 * Changes every element having class oldClass. Replace that class
 * with the class newClass
 * @param {*} oldClass the class to replace
 * @param {*} newClass the new class
 */
function changeEveryClass(oldClass, newClass) {
  const els = document.querySelectorAll("." + oldClass);
  for (let i = 0; i < els.length; i++) {
    const el = els.item(i);
    el.classList.remove(oldClass);
    el.classList.add(newClass);
  }
}

/**
 * Actual update of the style of the appropriate element according to
 * the state set in headerState.
 */
function updateHeader() {
  logger.debug("Update header style", { newstate: headerState });
  if (headerState === "light") {
    changeEveryClass(
      scriptVar.cssHeaderDarkClass,
      scriptVar.cssHeaderLightClass
    );
    changeEveryClass(
      scriptVar.cssHeaderContentDarkClass,
      scriptVar.cssHeaderContentLightClass
    );
  }
  if (headerState === "dark") {
    changeEveryClass(
      scriptVar.cssHeaderLightClass,
      scriptVar.cssHeaderDarkClass
    );
    changeEveryClass(
      scriptVar.cssHeaderContentLightClass,
      scriptVar.cssHeaderContentDarkClass
    );
  }
}
