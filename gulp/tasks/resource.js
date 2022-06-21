import pkg from "gulp";
import path from "../config.js";

const { src, dest, watch } = pkg;

export const resourceBuild = () =>
  src(path.src.resource).pipe(dest(path.build.root));

export const resourceWatch = () => {
  watch(path.watch.resource, resourceBuild);
};
