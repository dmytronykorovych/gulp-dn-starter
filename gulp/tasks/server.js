import browserSync from "browser-sync";
import path from "../config.js";

const server = () => {
  browserSync.init({
    server: {
      baseDir: path.build.root,
    },
    open: false,
    notify: false,
  });
};

export default server;
