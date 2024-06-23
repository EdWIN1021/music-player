"use server";

import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "EdWIN1021";
const GITHUB_REPO = "music";
const GITHUB_BRANCH = "main";

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token is not set in the environment variables.");
}

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

    const fileContent = fs.readFileSync(outputFilePath);
    const base64Content = fileContent.toString("base64");

    const githubApiUrl = `https://api.github.com/repos/EdWIN1021/muisc/contents/${title}_${artist}.mp3`;

    console.log(`GitHub API URL: ${githubApiUrl}`); // Debugging line

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
        message: `Add ${title} by ${artist}`,
        content: base64Content,
        branch: GITHUB_BRANCH,
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

    console.log("File uploaded to GitHub!");
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Conversion and upload failed. Please try again.");
  }

  revalidatePath("/");
}
