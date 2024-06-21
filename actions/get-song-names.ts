"use server";

import fs from "fs";
import path from "path";

export async function getSongNames() {
  const publicFolderPath = path.join(process.cwd(), "public/music");
  return fs.readdirSync(publicFolderPath).map((file) => file.split(".")[0]);
}
