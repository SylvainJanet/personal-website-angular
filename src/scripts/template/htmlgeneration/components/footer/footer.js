const footer = document.createElement("footer");

const p = document.createElement("p");

const span = document.createElement("span");
span.setAttribute("id", "footer");
const a = document.createElement("a");
a.setAttribute("href", "https://sylvainjanet.fr");
a.setAttribute("id", "footerLink");

p.appendChild(span);
p.appendChild(a);

footer.appendChild(p);

export { footer };
