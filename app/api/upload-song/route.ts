import { NextResponse } from "next/server";
import fs, { chownSync } from "fs";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath!);

export async function POST(request: Request) {
  try {
    let youtubeUrl = "https://www.youtube.com/watch?v=KBsJNfRFMkk";

    const outputFilePath = "downloaded_audio.mp3";
    console.log("Downloading video...");
    await downloadYouTubeVideoAsMP3(youtubeUrl, outputFilePath);
    console.log("Download complete. Encoding to base64...");
    const base64EncodedMP3 = await encodeMP3ToBase64(outputFilePath);
    console.log("Encoding complete.");

    console.log(base64EncodedMP3);

    return NextResponse.json({
      message: "Processing finished successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error });
  }
}

async function downloadYouTubeVideoAsMP3(
  youtubeUrl: string,
  outputFilePath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = ytdl(youtubeUrl, { quality: "highestaudio" });
    ffmpeg(stream)
      .audioBitrate(128)
      .save(outputFilePath)
      .on("end", () => resolve(outputFilePath))
      .on("error", (error: Error) => reject(error));
  });
}

async function encodeMP3ToBase64(filePath: string): Promise<string> {
  const audioBuffer = fs.readFileSync(filePath);
  return audioBuffer.toString("base64");
}
