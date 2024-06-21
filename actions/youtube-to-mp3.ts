"use server";

import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";

export async function youtubeToMp3(formData: FormData) {
  const url = formData.get("url");
  const title = formData.get("title");
  const artist = formData.get("artist");

  ffmpeg.setFfmpegPath("./ffmpeg");

  const videoURL = String(url);

  const outputFilePath = `./public/music/${title}_${artist}.mp3`;

  const videoStream = ytdl(videoURL, { filter: "audioonly" });

  videoStream.on("error", (err) => {
    console.error("Error downloading video:", err);
  });

  ffmpeg(videoStream)
    .audioBitrate(128)
    .toFormat("mp3")
    .on("end", () => {
      console.log("Conversion complete!");
    })
    .on("error", (err: unknown) => {
      console.error("Error during conversion:", err);
    })
    .save(outputFilePath);
}