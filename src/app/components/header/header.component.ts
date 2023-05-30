import { Component, HostListener, OnInit } from '@angular/core';
import { scriptVar } from '../../../scripts/template/tools/setUp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  bannerHeight = document.documentElement.clientHeight;

  trigger = this.bannerHeight; // banner height - header height
  // so that the threshold corresponds to the end of the banner
  headerState =
    scrollY > this.trigger
      ? scriptVar.headerStateLight
      : scriptVar.headerStateDark;

  ngOnInit() {
    this.updateHeader();
    console.log(this.bannerHeight);
  }

  /**
   * Changes every element having class oldClass. Replace that class
   * with the class newClass
   * @param {*} oldClass the class to replace
   * @param {*} newClass the new class
   */
  changeEveryClass(oldClass: string, newClass: string) {
    const els = document.querySelectorAll('.' + oldClass);
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
  updateHeader() {
    if (this.headerState === 'light') {
      this.changeEveryClass(
        scriptVar.cssHeaderDarkClass,
        scriptVar.cssHeaderLightClass
      );
      this.changeEveryClass(
        scriptVar.cssHeaderContentDarkClass,
        scriptVar.cssHeaderContentLightClass
      );
    }
    if (this.headerState === 'dark') {
      this.changeEveryClass(
        scriptVar.cssHeaderLightClass,
        scriptVar.cssHeaderDarkClass
      );
      this.changeEveryClass(
        scriptVar.cssHeaderContentLightClass,
        scriptVar.cssHeaderContentDarkClass
      );
    }
  }

  /**
   * Update the variable headerState with the state of the header
   * depending on the scrollY value.
   * Below a threshold, the header should be dark. Once the scrollY
   * value goes over, the header should be light.
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (scrollY > this.trigger) {
      if (this.headerState == scriptVar.headerStateDark) {
        this.headerState = scriptVar.headerStateLight;
        this.updateHeader();
      }
    }
    if (scrollY <= this.trigger) {
      if (this.headerState == scriptVar.headerStateLight) {
        this.headerState = scriptVar.headerStateDark;
        this.updateHeader();
      }
    }
  }
}

/**
 * Get the elements having class line-on-over. Their next siblings should be
 * the element representing the line that will appear on mouseenter and disapear
 * on mouseleave.
 */
const els = document.getElementsByClassName(scriptVar.cssLineOnHoverClass);

/**
 * Get an array of object containing the info on the element that has to be mouseentered,
 * and on the element that will be the line appearing.
 */
const liste = [];
for (let index = 0; index < els.length; index++) {
  liste.push({
    clickable: els.item(index),
    line: els.item(index)?.nextElementSibling,
  });
}

/**
 * Gets the actual width of an element
 * @param {*} element the element
 * @returns the actual width
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getActualWidth(element: any) {
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
 * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * Test wether or not the user is on mobile.
 * @returns true if the user is on mobile
 */
const mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      // eslint-disable-next-line no-useless-escape
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      // eslint-disable-next-line no-useless-escape
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent);
  return check;
};

/**
 * Add the appropriate event listener to change the styles of the line elements
 * on either mouseenter/mouseleave (when on desktop). This behaviour doesn't translate
 * exactly well on mobile (when the user stop touching the screen, the mouse isn't
 * leaving the last place the user touched). Thus, touchstart/touchend is more appropriate
 * for mobile.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
liste.forEach((x: any) => {
  if (mobileCheck()) {
    x.clickable.addEventListener('touchstart', () => {
      const width = getActualWidth(x.clickable);
      x.line.style.width = (75 * width) / 100 + 'px';
    });

    x.clickable.addEventListener('touchend', () => {
      x.line.style.width = '0%';
    });
  } else {
    x.clickable.addEventListener('mouseenter', () => {
      const width = getActualWidth(x.clickable);
      x.line.style.width = (75 * width) / 100 + 'px';
    });

    x.clickable.addEventListener('mouseleave', () => {
      x.line.style.width = '0%';
    });
  }
});
