import { NextResponse } from "next/server";
import fs from "fs";
import https from "https";
import path from "path";
import sevenBin from "7zip-bin";
import { extractFull } from "node-7z";

export async function POST(request: Request) {
  try {
    const url = "https://ffmpeg.org/releases/ffmpeg-7.0.1.tar.xz";
    const outputPath = path.join(process.cwd(), "ffmpeg-7.0.1.tar.xz");
    const extractPath = path.join(process.cwd(), "extracted_files");

    const downloadFile = () => {
      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);

        https
          .get(url, (response) => {
            if (response.statusCode !== 200) {
              reject(
                new Error(`Failed to get '${url}' (${response.statusCode})`)
              );
              response.resume();
              return;
            }

            response.pipe(file);

            file.on("finish", () => {
              file.close(() => {
                resolve("Download completed!");
              });
            });
          })
          .on("error", (err) => {
            fs.unlink(outputPath, () => {}); // Delete the file async. (But we don't check the result)
            reject(new Error(`Error: ${err.message}`));
          });
      });
    };

    const extractFile = () => {
      return new Promise((resolve, reject) => {
        extractFull(outputPath, extractPath, {
          $bin: sevenBin.path7za,
        })
          .on("end", () => {
            resolve("Extraction completed!");
          })
          .on("error", (err) => {
            reject(new Error(`Error during extraction: ${err.message}`));
          });
      });
    };

    const downloadResult = await downloadFile();
    console.log(downloadResult);

    const extractResult = await extractFile();
    console.log(extractResult);

    return NextResponse.json({
      message: "Processing finished successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
