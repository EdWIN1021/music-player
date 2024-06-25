import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ffmpegPath = path.join(process.cwd(), "ffmpeg");

  // Log the ffmpeg path
  console.log(`FFmpeg Path: ${ffmpegPath}`);

  ffmpeg.setFfmpegPath(ffmpegPath);

  const outputFilePath = path.join(process.cwd(), "output.mp3");
  const videoURL = "https://www.youtube.com/watch?v=uy3bB5HzEzM";

  try {
    // Create a stream from the YouTube video URL
    const videoStream = ytdl(videoURL, { filter: "audioonly" });

    // Use ffmpeg to process the audio stream
    await new Promise((resolve, reject) => {
      ffmpeg(videoStream)
        .audioBitrate(128)
        .toFormat("mp3")
        .on("end", () => {
          console.log("Processing finished successfully");
          resolve("");
        })
        .on("error", (err) => {
          console.error("Error processing video:", err);
          reject(err);
        })
        .save(outputFilePath);
    });

    return NextResponse.json({
      message: "Processing finished successfully",
      outputFilePath,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ status: 500 });
  }
}
