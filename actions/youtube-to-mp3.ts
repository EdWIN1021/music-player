"use server";

import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { simpleGit } from "simple-git";
import { revalidatePath } from "next/cache";
import path from "path";

export async function youtubeToMp3(formData: FormData) {
  const url = formData.get("url");
  const title = formData.get("title");
  const artist = formData.get("artist");

  if (!url || !title || !artist) {
    throw new Error("Missing required fields: url, title, or artist");
  }

  const videoURL = String(url);
  const ffmpegPath = path.join(process.cwd(), "ffmpeg");
  ffmpeg.setFfmpegPath(ffmpegPath);

  const outputFilePath = path.join(
    process.cwd(),
    "public",
    "music",
    `${title}_${artist}.mp3`
  );

  const videoStream = ytdl(videoURL, { filter: "audioonly" });

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(videoStream)
        .audioBitrate(128)
        .toFormat("mp3")
        .on("end", resolve)
        .on("error", reject)
        .save(outputFilePath);
    });

    console.log("Conversion complete!");

    const git = simpleGit();
    await git.add(".");
    await git.commit("update");
    await git.push();

    console.log("Pushed to remote repository successfully");
  } catch (err) {
    console.error("Error:", err);
  }

  revalidatePath("/");
}
