import pkg from "gulp";
import path from "./gulp/config.js";
import clean from "./gulp/tasks/clean.js";

import { htmlBuild, htmlWatch } from "./gulp/tasks/html.js";
import { cssBuild, cssWatch } from "./gulp/tasks/css.js";
import { jsBuild, jsWatch } from "./gulp/tasks/js.js";
import { imgBuild, imgWatch } from "./gulp/tasks/img.js";
import { spriteBuild, spriteWatch } from "./gulp/tasks/sprites.js";
import { resourceBuild, resourceWatch } from "./gulp/tasks/resource.js";
import server from "./gulp/tasks/server.js";

const { series, parallel } = pkg;

path.setEnv();

export const build = series(
  clean,
  parallel(htmlBuild, cssBuild, jsBuild, imgBuild, spriteBuild, resourceBuild),
);

export default series(
  build,
  parallel(
    server,
    htmlWatch,
    cssWatch,
    jsWatch,
    imgWatch,
    spriteWatch,
    resourceWatch,
  ),
);
