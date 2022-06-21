import pkg from "gulp";
import gulpIf from "gulp-if";
import imageMin, { mozjpeg, svgo } from "gulp-imagemin";
import imageMinPngQuant from "imagemin-pngquant";
import webp from "gulp-webp";
import newer from "gulp-newer";
import path from "../config.js";

const { src, dest, watch } = pkg;

export const imgBuild = () =>
  src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(
      gulpIf(
        path.isProd,
        imageMin(
          [
            mozjpeg({ quality: 75, progressive: true }),
            imageMinPngQuant({ quality: [0.6, 0.8] }),
            svgo({
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "cleanupIDs",
                  active: true,
                },
                {
                  name: "removeAttrs",
                  params: {
                    attrs: [
                      "class",
                      "data-name",
                      "fill.*",
                      "stroke.*",
                      "style",
                      "x",
                      "y",
                      "version",
                    ],
                  },
                },
                {
                  name: "cleanupAttrs",
                  active: true,
                },
                {
                  name: "removeXMLProcInst",
                  active: true,
                },
                {
                  name: "removeComments",
                  active: true,
                },
                {
                  name: "removeEmptyAttrs",
                  active: true,
                },
                {
                  name: "removeNonInheritableGroupAttrs",
                  active: true,
                },
                {
                  name: "collapseGroups",
                  active: true,
                },
                {
                  name: "removeDimensions",
                  active: true,
                },
                {
                  name: "removeStyleElement",
                  active: true,
                },
                {
                  name: "removeUnknownsAndDefaults",
                  active: true,
                },
                {
                  name: "removeHiddenElems",
                  active: true,
                },
                {
                  name: "removeEmptyContainers",
                  active: true,
                },
                // {
                //   name: "removeXMLNS",
                //   active: true,
                // },
              ],
            }),
          ],
          { verbose: true },
        ),
      ),
    )
    .pipe(dest(path.build.img));

export const imgWatch = () => {
  watch(path.watch.img, imgBuild);
};
