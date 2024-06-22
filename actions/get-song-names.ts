"use server";

import fs from "fs/promises";
import path from "path";

export async function getSongNames() {
  const publicFolderPath = path.join(process.cwd(), "public/music");
  try {
    const files = await fs.readdir(publicFolderPath);
    return files.map((file) => file.split(".")[0]);
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
}
