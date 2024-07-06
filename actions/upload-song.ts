"use server";

import { revalidatePath } from "next/cache";

interface UploadFormState {
  errors: {
    content?: string[];
  };
  success?: boolean;
}

export async function uploadSong(
  formState: UploadFormState,
  formData: FormData
): Promise<{ errors: Record<string, string[]>; success: boolean }> {
  const title = formData.get("title") as string;
  const artist = formData.get("artist") as string;
  const file = formData.get("file") as File;

  if (!file || !title || !artist) {
    throw new Error("Missing required fields: file, title, or artist");
  }

  const base64Content = await fileToBase64(file);

  const githubApiUrl = `https://api.github.com/repos/EdWIN1021/music/contents/${title}_${artist}.mp3`;

  console.log(`GitHub API URL: ${githubApiUrl}`); // Debugging line

  let fileSha: string | null = null;

  try {
    const shaResponse = await fetch(githubApiUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
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
  } catch (error) {
    console.error(`Error fetching file SHA: ${(error as Error).message}`);
    throw new Error(`Error fetching file SHA: ${(error as Error).message}`);
  }

  try {
    const uploadResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add ${title} by ${artist}`,
        content: base64Content,
        branch: process.env.GITHUB_BRANCH,
        sha: fileSha,
      }),
    });

    if (!uploadResponse.ok) {
      const errorResponse = await uploadResponse.json();
      console.error(`GitHub API Error: ${errorResponse.message}`);
      throw new Error(
        `Failed to upload file to GitHub: ${uploadResponse.statusText}`
      );
    }

    revalidatePath("/");
  } catch (error) {
    console.error(
      `Error uploading file to GitHub: ${(error as Error).message}`
    );
    throw new Error(
      `Error uploading file to GitHub: ${(error as Error).message}`
    );
  }

  return { errors: {}, success: true };
}

async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}
