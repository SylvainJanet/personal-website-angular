import { scriptVar } from "../../../tools/setUp.js";

const prefix = scriptVar.prefixFiles;

const a = document.createElement("a");
a.setAttribute("href", "#");
a.setAttribute("class", "back-to-top");

const obj = document.createElement("object");
obj.setAttribute("data", prefix + "img/template/arrow_top_up_icon.svg");
obj.setAttribute("width", "60");
obj.setAttribute("height", "60");
obj.setAttribute("id", "backToTopIcon");
obj.innerText = "Back to top icon";

a.appendChild(obj);

export { a };
