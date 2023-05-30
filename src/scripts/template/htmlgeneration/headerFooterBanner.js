/**
 * Inserts Header, Footer, BackToTop icon and Banner into the DOM
 */
import "./setUp/headerFooterBanner.js";
import { footer } from "./components/footer/footer.js";
import { a } from "./components/backToTop/backToTop.js";
import { header } from "./components/header/header.js";
import { banner } from "./components/banner/banner.js";

let body = document.getElementsByTagName("body").item(0);
let firstScript = body.getElementsByTagName("script").item(0);

body.insertBefore(footer, firstScript);
body.insertBefore(a, firstScript);

body.insertBefore(banner, body.firstChild);
body.insertBefore(header, body.firstChild);
