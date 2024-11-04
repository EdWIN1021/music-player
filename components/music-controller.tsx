"use client";

import React, { FC, useContext, useEffect, useRef } from "react";
import { Play, Pause, StepForward, StepBack } from "lucide-react";
import { MusicContext } from "@/music-provider";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

interface MusicControllerProps {
  songs: Song[];
}

async function fetchImage() {
  const response = await fetch("https://picsum.photos/200", {
    cache: "no-store",
  });

  const data = await response.json();

  console.log(data);

  return data;
}

const MusicController: FC<MusicControllerProps> = ({ songs }) => {
  const {
    data: image,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["image"],
    queryFn: fetchImage,
  });

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
  }, []);

  const handleEnded = () => setRandomSong();
  const handlePrevious = () => setRandomSong();
  const handleNext = () => setRandomSong();

  const handlePlayPause = () => {
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
        <div className=" w-full">
          <div className="mx-8 my-5 rounded-xl shadow-[0_2px_15px_-1px_rgba(0,0,0,0.1)] px-5 py-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <Image
                  className="rounded"
                  src={"https://picsum.photos/40"}
                  width={40}
                  height={40}
                  style={{ height: "auto", width: "auto" }}
                  alt="..."
                />

                <p className="sm:text-center flex items-center whitespace-nowrap">
                  <span className="text-sm font-medium">
                    {currentSong?.name.split(".")[0]}
                  </span>
                  {" - "}
                  <span className="text-xs text-gray-500">
                    {currentSong?.name.split(".")[1]}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-5">
                <StepBack
                  className="cursor-pointer fill-black"
                  onClick={handlePrevious}
                />
                <div
                  className="rounded-full p-1 cursor-pointer shadow-2xl"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="fill-black" />
                  ) : (
                    <Play className="fill-black" />
                  )}
                </div>
                <StepForward
                  className="cursor-pointer fill-black"
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicController;
