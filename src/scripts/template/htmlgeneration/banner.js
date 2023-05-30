/**
 * Inserts Banner into the DOM
 */
import "./setUp/banner.js";
import { banner } from "./components/banner/banner.js";

let body = document.getElementsByTagName("body").item(0);

body.insertBefore(banner, body.firstChild);
