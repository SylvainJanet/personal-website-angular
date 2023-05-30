/**
 * Inserts Footer, BackToTop icon into the DOM
 */
import "./setUp/footer.js";
import { footer } from "./components/footer/footer.js";
import { a } from "./components/backToTop/backToTop.js";

let body = document.getElementsByTagName("body").item(0);
let firstScript = body.getElementsByTagName("script").item(0);

body.insertBefore(footer, firstScript);
body.insertBefore(a, firstScript);
