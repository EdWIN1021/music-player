"use server";

import ytdl from "@distube/ytdl-core";
import { revalidatePath } from "next/cache";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

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
  const url = formData.get("url") as string | null;
  const title = formData.get("title") as string | null;
  const artist = formData.get("artist") as string | null;

  const outputPath = path.join(
    process.cwd(),
    "music",
    `${title?.trim()}.${artist?.trim()}.mp3`
  );

  const videoUrl = String(url);

  try {
    const stream = ytdl(videoUrl, {
      filter: "audioonly",
    });

    await new Promise<void>((resolve, reject) => {
      ffmpeg(stream)
        .audioCodec("libmp3lame")
        .toFormat("mp3")
        .on("end", () => {
          console.log(`Converted to MP3: ${outputPath}`);
          resolve();
        })
        .on("error", (err) => {
          console.error(`Error: ${err.message}`);
          reject(err);
        })
        .save(outputPath);
    });

    revalidatePath("/");

    return { errors: {}, success: true };
  } catch (error) {
    console.error("Conversion failed");
    return {
      errors: { content: ["Conversion failed. Please try again."] },
      success: false,
    };
  }
}
