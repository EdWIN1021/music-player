"use client";
import { useState, ChangeEvent } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const mp3Files = filesArray.filter((file) => file.name.endsWith(".mp3"));
      setFiles(mp3Files);
    }
  };

  return (
    <div>
      <h1>Music Player</h1>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFolderSelect}
      />
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>{file.name}</p>
              <audio controls>
                <source src={URL.createObjectURL(file)} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      ) : (
        <p>No music files found</p>
      )}
    </div>
  );
}
