"use server";

import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { simpleGit, CleanOptions } from "simple-git";

export async function youtubeToMp3(formData: FormData) {
  const url = formData.get("url");
  const title = formData.get("title");
  const artist = formData.get("artist");

  const videoURL = String(url);

  ffmpeg.setFfmpegPath("./ffmpeg");

  const outputFilePath = `./public/music/${title}_${artist}.mp3`;

  const videoStream = ytdl(videoURL, { filter: "audioonly" });

  try {
    videoStream.on("error", (err) => {
      console.error("Error downloading video:", err);
    });

    await ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat("mp3")
      .on("end", () => {
        console.log("Conversion complete!");
      })
      .on("error", (err: unknown) => {
        console.error("Error during conversion:", err);
      })
      .save(outputFilePath);

    const git = simpleGit();
    await git
      .add(".")
      .then(() => git.commit("update"))
      .then(() => git.push())
      .then(() => console.log("Pushed to remote repository successfully"))
      .catch((err) => console.error("Failed: ", err));
  } catch (err) {
    console.log(err);
  }
}
