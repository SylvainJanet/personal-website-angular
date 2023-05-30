/**
 * Inserts Header into the DOM
 */
import "./setUp/header.js";
import { header } from "./components/header/header.js";

let body = document.getElementsByTagName("body").item(0);

body.insertBefore(header, body.firstChild);
