"use client";

import { useState, useEffect, ChangeEvent } from "react";

interface StoredFile {
  name: string;
  path: string;
}

export default function Test() {
  const [files, setFiles] = useState<File[]>([]);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);

  // Load stored files metadata on mount
  useEffect(() => {
    const storedFileData = localStorage.getItem("musicFiles");
    if (storedFileData) {
      setStoredFiles(JSON.parse(storedFileData));
    }
  }, []);

  // Store file metadata whenever files are updated
  useEffect(() => {
    if (files.length > 0) {
      const fileMetadata = files.map((file) => ({
        name: file.name,
        path: file.webkitRelativePath || file.name,
      }));
      localStorage.setItem("musicFiles", JSON.stringify(fileMetadata));
    }
  }, [files]);

  const handleFolderSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const mp3Files = filesArray.filter((file) => file.name.endsWith(".mp3"));
      setFiles(mp3Files);

      if (mp3Files.length > 0) {
        const filePath = mp3Files[0].webkitRelativePath;
        const directoryPath = filePath.substring(0, filePath.lastIndexOf("/"));
        console.log("Directory Path:", directoryPath);
      }
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
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer", color: "blue" }}>
        Select Folder
      </label>
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
        <div>
          {storedFiles.length > 0 ? (
            <div>
              <p>Previously selected files:</p>
              <ul>
                {storedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
              <p>Please re-select the folder to restore the files.</p>
            </div>
          ) : (
            <p>No music files found</p>
          )}
        </div>
      )}
    </div>
  );
}
