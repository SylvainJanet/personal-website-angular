// Based on https://gist.github.com/motss/cb65fd2034b6937c4cfd0264fc458cf6
function supportsCssVariables() {
  const opacity = 1;
  const el = document.body;
  let result = false;

  // Setup CSS properties:
  el.style.setProperty("--test-opacity", opacity);
  el.style.setProperty("opacity", "var(--test-opacity)");

  // Feature-detection:
  result = window.getComputedStyle(el).opacity == opacity;

  // Remove the set properties:
  el.style.setProperty("--test-opacity", "");
  el.style.opacity = "";

  // Plus "window.CSS" for IE11:
  return result && window.CSS;
}

if (!supportsCssVariables()) {
  document.body.innerHTML =
    '<p style="padding:0.5em;text-align:center;font-size:1.6em">' +
    "Please use a modern browser, " +
    "for example " +
    '<a style="color:black" href="https://www.google.com/chrome/">Google Chrome</a>.</p>';
}
