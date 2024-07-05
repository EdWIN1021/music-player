"use client";

import React, { useEffect, useState } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import Config from "./config";

function getConfigFromLocalStorage(): Promise<Configuration | null> {
  return new Promise((resolve, reject) => {
    try {
      const config = localStorage.getItem("config");
      if (config) {
        resolve(JSON.parse(config));
      } else {
        resolve(null); // or resolve with default config if desired
      }
    } catch (error) {
      reject(error);
    }
  });
}

interface MusicPlayerProps {
  songs: Song[];
}

interface Configuration {
  apiKey: string;
  githubId: string;
  repo: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [config, setConfig] = useState<Configuration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConfig = async () => {
      const config = await getConfigFromLocalStorage();
      if (config) setConfig(config);
      setLoading(false);
    };
    getConfig();
  }, []);

  console.log(config);

  return (
    <>
      {/*  "https://api.github.com/repos/EdWIN1021/muisc/contents" */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {config ? (
            <div className="flex flex-col overflow-hidden">
              <PlayList songs={songs} />
              <MusicController songs={songs} />
            </div>
          ) : (
            <Config />
          )}
        </>
      )}
    </>
  );
};

export default MusicPlayer;
