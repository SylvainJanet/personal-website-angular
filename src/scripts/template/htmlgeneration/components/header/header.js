const header = document.createElement("div");
header.setAttribute("class", "header sticky dark-header");

/**
 * Why ontouchstart ?
 * -> https://stackoverflow.com/a/33681490
 */

const content =
  "" +
  '<div class="header-container">' +
  '<div class="left-header">' +
  '                <div class="line-on-hover-container">' +
  '                    <a class="line-on-hover" href="https://sylvainjanet.fr" id="backHome"></a>' +
  '                    <div class="line-on-hover-line dark-header-content"></div>' +
  "                </div>" +
  "            </div>" +
  '            <div class="right-header">' +
  '                <div class="line-on-hover-container">' +
  '                    <button class="line-on-hover" id="buttonLanguage"> </button>' +
  '                    <div class="line-on-hover-line dark-header-content"></div>' +
  "                </div>                " +
  "            </div>" +
  "            <div class='left-collapsed-header'>" +
  "               <div class='line-on-hover-container'>" +
  "                 <a" +
  "                 class='line-on-hover'" +
  "                 href='https://sylvainjanet.fr'" +
  "                 id='backHome'" +
  "                 >Sylvain Janet</a" +
  "               >" +
  "               <div class='line-on-hover-line dark-header-content'></div>" +
  "             </div>" +
  "             </div>" +
  '            <div class="collapsed-header">' +
  '                <div class="deroulant" ontouchstart>' +
  "                    <div>" +
  '                        <div class="collapsed-header-ico">' +
  '                            <div class="dark-header-content"></div>' +
  '                            <div class="dark-header-content"></div>' +
  '                            <div class="dark-header-content"></div>' +
  "                        </div>" +
  "                    </div>" +
  '                    <ul class="sous">' +
  "                        <li>" +
  '                            <div class="collapsed-header-item line-on-hover-container">' +
  '                                <a href="https://sylvainjanet.fr"' +
  '                                class="line-on-hover" id="subMenuBackHome">' +
  "                                </a> " +
  '                                <div class="line-on-hover-line dark-header-content"></div>' +
  "                            </div>" +
  "                        </li>" +
  "                        <li>" +
  '                            <div class="collapsed-header-item line-on-hover-container">' +
  '                                <button class="line-on-hover"  id="subMenuLg"></button>' +
  '                                <div class="line-on-hover-line dark-header-content"></div>' +
  "                            </div>" +
  "                        </li>" +
  "                    </ul>" +
  "                </div>" +
  "            </div>" +
  "            </div>" +
  "";

header.innerHTML = content;

export { header };
