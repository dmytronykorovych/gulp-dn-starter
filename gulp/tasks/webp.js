import pkg from "gulp";
import gulpIf from "gulp-if";
import webp from "gulp-webp";
import imageminWebp from "imagemin-webp";
import newer from "gulp-newer";
import path from "../config.js";

const { src, dest, watch } = pkg;

export const webpBuild = () =>
  src(path.src.webp)
    .pipe(newer(path.build.img))
    .pipe(
      webp(
        gulpIf(
          path.isProd,
          imageminWebp({
            lossless: true,
            quality: 80,
          }),
        ),
      ),
    )
    .pipe(dest(path.build.img));

export const webpWatch = () => {
  watch(path.watch.webp, webpBuild);
};
