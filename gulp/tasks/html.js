import pkg from "gulp";
import browserSync from "browser-sync";
import fileInclude from "gulp-file-include";
import htmlMin from "gulp-htmlmin";
import htmlBeautify from "gulp-html-beautify";
import gulpIf from "gulp-if";
import path from "../config.js";

const { src, dest, watch } = pkg;

export const htmlBuild = () =>
  src(path.src.html)
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      }),
    )
    .pipe(gulpIf(!path.isProd, htmlBeautify({ indent_size: 2 })))
    .pipe(gulpIf(path.isProd, htmlMin({ collapseWhitespace: true })))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());

export const htmlWatch = () => {
  watch(path.watch.html, htmlBuild);
};
