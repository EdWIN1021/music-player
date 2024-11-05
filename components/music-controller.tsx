"use client";

import React, { FC, useContext, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { MusicContext } from "@/music-provider";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

import { useQuery } from "@tanstack/react-query";

interface MusicControllerProps {
  songs: Song[];
}

const MusicController: FC<MusicControllerProps> = ({ songs }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    useContext(MusicContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.load();
      if (isPlaying) {
        audio.play();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    return () => {};
  }, []);

  useEffect(() => {
    if (!currentSong)
      setCurrentSong(songs[Math.floor(Math.random() * (songs.length + 1))]);
  }, [currentSong, setCurrentSong, songs]);

  const handleEnded = () => setRandomSong();
  const handlePrevious = () => setRandomSong();
  const handleNext = () => setRandomSong();

  const handlePlayAndPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setRandomSong = () => {
    setCurrentSong(songs[Math.floor(Math.random() * (songs.length + 1))]);
  };

  console.log(currentSong);

  return (
    <>
      <div className="hidden">
        {songs.length > 0 && (
          <>
            <audio controls ref={audioRef} preload="none" onEnded={handleEnded}>
              <source src={currentSong?.download_url} type="audio/mp3" />
            </audio>
          </>
        )}
      </div>

      {songs.length > 0 && (
        <div className="w-full">
          <div className=" rounded-xl shadow-[0_2px_15px_-1px_rgba(0,0,0,0.1)] px-5 py-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <Image
                  className="rounded"
                  src={"https://picsum.photos/200"}
                  width={40}
                  height={40}
                  style={{ height: "auto", width: "auto" }}
                  alt="..."
                />

                <p className="flex flex-col gap-1 whitespace-nowrap">
                  <span className="text-md font-medium">
                    {currentSong?.name.split(".")[0]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentSong?.name.split(".")[1]}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-5">
                <SkipBack
                  className="cursor-pointer fill-black"
                  onClick={handlePrevious}
                />
                <div
                  className="rounded-full p-1 cursor-pointer shadow-2xl"
                  onClick={handlePlayAndPause}
                >
                  {isPlaying ? (
                    <Pause className="bg-[#00C2CB] rounded-full w-10 h-10 p-2" />
                  ) : (
                    <Play className="bg-[#00C2CB] rounded-full w-10 h-10 p-2" />
                  )}
                </div>
                <SkipForward
                  className="cursor-pointer fill-black"
                  onClick={handleNext}
                />
              </div>
            </div>
            <Progress className="my-3" value={33} />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicController;
