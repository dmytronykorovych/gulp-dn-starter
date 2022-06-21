const srcFolder = "./src";
const srcAssetsFolder = `${srcFolder}/assets`;
const buildFolder = "./build";

const path = {
  src: {
    root: srcFolder,
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/main.js`,
    img: `${srcAssetsFolder}/images/**/*`,
    webp: `${srcAssetsFolder}/images/**/*.{jpg,jpeg,png}`,
    sprite: `${srcAssetsFolder}/sprites/*.svg`,
    resource: `${srcAssetsFolder}/resource/**/*`,
  },

  build: {
    root: buildFolder,
    html: buildFolder,
    css: `${buildFolder}/css`,
    js: `${buildFolder}/js`,
    img: `${buildFolder}/img`,
  },

  watch: {
    html: [`${srcFolder}/*.html`, `${srcFolder}/html/*.html`],
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcAssetsFolder}/images/**/*`,
    webp: `${srcAssetsFolder}/images/**/*.{jpg,jpeg,png}`,
    sprite: `${srcAssetsFolder}/sprites/*.svg`,
    resource: `${srcAssetsFolder}/resource/**/*`,
  },

  clean: buildFolder,

  setEnv() {
    this.isProd = process.argv.includes("--prod");
  },
};

export default path;
