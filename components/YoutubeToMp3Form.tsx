"use client";

import React, { useState } from "react";

const YoutubeToMp3Form: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setVideoFile(file || null);
  };

  const handleConvert = async () => {
    if (!videoFile) return;

    setLoading(true);
    const { createFFmpeg, fetchFile } = (window as any).FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });

    await ffmpeg.load();

    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run("-i", "input.mp4", "output.mp3");
    const data = ffmpeg.FS("readFile", "output.mp3");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mpeg" })
    );
    setOutputUrl(url);
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={loading || !videoFile}>
        {loading ? "Converting..." : "Convert to MP3"}
      </button>
      {outputUrl && (
        <div>
          <h3>Output:</h3>
          <audio controls>
            <source src={outputUrl} type="audio/mp3" />
          </audio>
          <a href={outputUrl} download="output.mp3">
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
};

export default YoutubeToMp3Form;
