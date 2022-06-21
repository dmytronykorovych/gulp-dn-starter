import pkg from "gulp";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import browserSync from "browser-sync";
import path from "../config.js";

const { dest, src, watch } = pkg;

export const jsBuild = () =>
  src(path.src.js)
    .pipe(
      webpackStream({
        mode: path.isProd ? "production" : "development",
        entry: path.src.js,
        output: {
          filename: "[name].js",
          chunkFilename: "[name].js",
          publicPath: "/",
        },

        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /node_modules/,
                chunks: "initial",
                name: "vendor",
                enforce: true,
              },
            },
          },
        },

        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        devtool: !path.isProd ? "source-map" : false,
      }),
      webpack,
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());

export const jsWatch = () => {
  watch(path.watch.scss, jsBuild);
};
