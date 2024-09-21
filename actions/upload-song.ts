"use server";

import ffmpeg from "fluent-ffmpeg";
import { revalidatePath } from "next/cache";
import path from "path";
import youtubedl from "youtube-dl-exec";
import fs from "fs/promises"; // Import fs/promises for file operations

interface YoutubeToMp3FormState {
  errors: {
    content?: string[];
  };
  success?: boolean;
}

const ffmpegPath = path.join(process.cwd(), "tmp", "ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

export async function uploadSong(
  formState: YoutubeToMp3FormState,
  formData: FormData
) {
  const url = formData.get("url");
  const title = formData.get("title");
  const artist = formData.get("artist");

  if (!url || !title || !artist) {
    throw new Error("Missing required fields: url, title, or artist");
  }

  const videoURL = String(url);

  // Await the download and conversion process
  await downloadAndConvert(videoURL);

  revalidatePath("/");

  return { errors: {}, success: true };
}

async function convertWebMToMP3(inputFilePath: string) {
  const outputFilePath = path.join(
    path.dirname(inputFilePath),
    `${path.basename(inputFilePath, ".webm")}.mp3`
  );

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .audioBitrate(128)
      .toFormat("mp3")
      .on("end", () => {
        console.log("Conversion finished successfully");
        resolve(outputFilePath);
      })
      .on("error", (err) => {
        console.error("Error during conversion:", err);
        reject(err);
      })
      .save(outputFilePath);
  });
}

async function downloadAndConvert(videoUrl: string) {
  const webmFilePath = path.join(process.cwd(), "tmp", "output.webm");

  try {
    // Step 1: Download the audio as WebM
    const output = await youtubedl(videoUrl, {
      extractAudio: true,
      audioFormat: "mp3", // Use webm format for downloading
      preferFfmpeg: true,
      output: webmFilePath,
    });
    console.log("Download completed:", output);

    // Step 2: Convert WebM to MP3
    const mp3Path = await convertWebMToMP3(webmFilePath);
    console.log("MP3 saved to:", mp3Path);

    // Step 3: Cleanup the temporary WebM file
    await fs.unlink(webmFilePath);
    console.log("Temporary WebM file deleted.");
  } catch (err) {
    console.error("Error:", err);
  }
}
