import pkg from "gulp";
import svgSprite from "gulp-svg-sprite";
import path from "../config.js";

const { src, dest, watch } = pkg;

export const spriteBuild = () =>
  src(path.src.sprite)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ["class", "data-name", "fill.*", "stroke.*"],
                    },
                  },
                ],
              },
            },
          ],
        },
        svg: {
          rootAttributes: {
            style: "display:none",
            "aria-hidden": true,
          },
          xmlDeclaration: false,
          transform: [(svg) => svg.replace(/(<style.*?<\/style>)/g, "")],
        },
      }),
    )
    .pipe(dest(path.build.img));

export const spriteWatch = () => {
  watch(path.watch.sprite, spriteBuild);
};
