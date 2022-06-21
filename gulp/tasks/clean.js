import del from "del";
import path from "../config.js";

const clean = () => del(path.clean);

export default clean;
