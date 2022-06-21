import pkg from "gulp";
import gulpIf from "gulp-if";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import minCSS from "gulp-clean-css";
import groupMedia from "gulp-group-css-media-queries";
import autoPrefixer from "gulp-autoprefixer";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import path from "../config.js";

const { dest, src, watch } = pkg;

const sass = gulpSass(dartSass);

export const cssBuild = () =>
  src(path.src.scss, { sourcemaps: !path.isProd })
    .pipe(
      plumber(
        notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(sass())
    .pipe(groupMedia())
    .pipe(
      gulpIf(
        path.isProd,
        autoPrefixer({
          cascade: false,
          grid: true,
          overrideBrowserslist: ["last 5 versions"],
        }),
      ),
    )
    .pipe(
      gulpIf(
        path.isProd,
        minCSS({
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        }),
      ),
    )
    .pipe(dest(path.build.css), { sourcemaps: !path.isProd })
    .pipe(browserSync.stream());

export const cssWatch = () => {
  watch(path.watch.scss, cssBuild);
};
