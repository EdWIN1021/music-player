import fs from "fs";
import path from "path";

export function getFileNames() {
  const publicFolderPath = path.join(process.cwd(), "public/music");
  return fs.readdirSync(publicFolderPath).map((file) => file.split(".")[0]);
}
