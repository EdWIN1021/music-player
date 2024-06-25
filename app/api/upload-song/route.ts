import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import { NextResponse } from "next/server";
import fs from "fs";
import { exec } from "child_process";

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(request: Request) {
  const ffmpegPath = path.join(process.cwd(), "ffmpeg");

  console.log(`FFmpeg Path: ${ffmpegPath}`);

  ffmpeg.setFfmpegPath(ffmpegPath);

  const outputFilePath = path.join(process.cwd(), "output.mp3");
  const videoURL = "https://www.youtube.com/watch?v=uy3bB5HzEzM";

  try {
    const videoStream = ytdl(videoURL, { filter: "audioonly" });

    const res = await new Promise((resolve, reject) => {
      ffmpeg(videoStream)
        .audioBitrate(128)
        .toFormat("mp3")
        .on("end", () => {
          console.log("Processing finished successfully");
          resolve("success");
        })
        .on("error", (err) => {
          console.error("Error processing video:", err.message, err.stack);
          reject(err);
        })
        .save(outputFilePath);
    });

    console.log(res);

    return NextResponse.json({
      message: "Processing finished successfully",
      outputFilePath,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 500, message: error.message });
    }
  }
}
