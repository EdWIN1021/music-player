import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  ffmpeg.setFfmpegPath(path.join(process.cwd(), "ffmpeg"));
  const outputFilePath = path.join(process.cwd(), "output.mp3");

  const videoURL = "https://www.youtube.com/watch?v=uy3bB5HzEzM";

  const videoStream = ytdl(videoURL, { filter: "audioonly" });
  await new Promise((resolve, reject) => {
    ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat("mp3")
      .on("end", resolve)
      .on("error", reject)
      .save(outputFilePath);
  });

  return NextResponse.json("lol");
}
