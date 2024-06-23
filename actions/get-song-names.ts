"use server";

import path from "path";
import fs from "fs";

export async function getSongNames() {
  // const publicFolderPath = path.join(process.cwd(), "public/music");
  // try {
  //   const files = await fs.readdir(publicFolderPath);
  //   return files.map((file) => file.split(".")[0]);
  // } catch (error) {
  //   console.error("Error reading directory:", error);
  //   throw error;
  // }

  const musicDirectory = path.resolve("/Users/edwin/Desktop/music");
  try {
    const files = fs.readdirSync(musicDirectory);
    const musicFiles = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => ({
        name: file,
        url: `/api/music/file?name=${file}`,
      }));

    return files.map((file) => file.split(".")[0]);
  } catch (error) {
    console.error("Error reading music directory:", error);
  }
}
