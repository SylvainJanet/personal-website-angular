import { scriptVar } from "../../../tools/setUp.js";

const banner = document.createElement("div");
banner.setAttribute("class", "banner-container");

const prefix = scriptVar.prefixFiles;

const content =
  "" +
  '<div class="banner">' +
  '                <div class="page-title-container">' +
  '                    <div class="page-title">' +
  "                        <div>" +
  "                            <h2>" +
  '<span></span> <span class="text-animated"></span>' +
  "                            </h2>" +
  "                        </div>" +
  '                        <h1 class="title-container">' +
  '                            <object data="' +
  prefix +
  'img/template/Toki_pona.svg" width="75" height="75"' +
  '                                id="tokiPonaLogo">Toki Pona Logo' +
  "                            </object>" +
  "                            <div>" +
  '                                <span id="h1title"></span>' +
  "                            </div>" +
  "                        </h1>" +
  "                    </div>" +
  "                </div>" +
  "            </div>" +
  "";

banner.innerHTML = content;

export { banner };
