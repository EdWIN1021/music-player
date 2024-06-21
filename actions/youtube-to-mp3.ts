"use server";

import ytdl from "ytdl-core";

const ffmpeg = require("fluent-ffmpeg");

export async function youtubeToMp3(formData: FormData) {
  const url = formData.get("url");

  ffmpeg.setFfmpegPath("./ffmpeg"); // Replace with the actual path to ffmpeg

  // URL of the YouTube video you want to download and convert
  const videoURL = String(url);

  // Path where the MP3 file will be saved
  const outputFilePath = "output.mp3";

  // Create a readable stream from the YouTube video
  const videoStream = ytdl(videoURL, { filter: "audioonly" });

  videoStream.on("error", (err) => {
    console.error("Error downloading video:", err);
  });

  // Set up the ffmpeg command
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
