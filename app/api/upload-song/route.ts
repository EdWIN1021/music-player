import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import { NextResponse } from "next/server";
import fs from "fs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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
    const res = await new Promise((resolve, reject) => {
      ffmpeg(videoStream)
        .audioBitrate(128)
        .toFormat("mp3")
        .on("end", () => {
          console.log("Processing finished successfully");
          resolve("success");
        })
        .on("error", (err) => {
          console.error("Error processing video:", err);
          reject(err);
        })
        .save(outputFilePath);
    });

    console.log(res);

    const fileContent = fs.readFileSync(outputFilePath);
    const base64Content = fileContent.toString("base64");

    const githubApiUrl = `https://api.github.com/repos/EdWIN1021/muisc/contents/test_01.mp3`;

    console.log(`GitHub API URL: ${githubApiUrl}`);

    let fileSha = null;

    const shaResponse = await fetch(githubApiUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (shaResponse.ok) {
      const data = await shaResponse.json();
      fileSha = data.sha;
    } else if (shaResponse.status === 404) {
      console.log("File does not exist yet, proceeding to upload.");
    } else {
      throw new Error(`Failed to fetch file SHA: ${shaResponse.statusText}`);
    }

    const uploadResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add ${1} by ${1}`,
        content: base64Content,
        branch: "main",
        sha: fileSha,
      }),
    });

    if (!uploadResponse.ok) {
      const errorResponse = await uploadResponse.json();
      console.error(`GitHub API Error: ${errorResponse.message}`); // Detailed error message
      throw new Error(
        `Failed to upload file to GitHub: ${uploadResponse.statusText}`
      );
    }

    return NextResponse.json({
      message: "Processing finished successfully",
      outputFilePath,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ status: 500 });
  }
}
