/**
 * Inserts Header and Banner into the DOM
 */
import "./setUp/headerBanner.js";
import { header } from "./components/header/header.js";
import { banner } from "./components/banner/banner.js";

let body = document.getElementsByTagName("body").item(0);

body.insertBefore(banner, body.firstChild);
body.insertBefore(header, body.firstChild);
