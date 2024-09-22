import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Play, Pause, StepForward, StepBack, Shuffle } from "lucide-react";
import { MusicContext } from "@/music-provider";
import clsx from "clsx";

interface MusicControllerProps {
  songs: Song[];
}

const MusicController: FC<MusicControllerProps> = ({ songs }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    useContext(MusicContext);

  const [isShuffle, setIsShuffle] = useState(true);

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

  console.log(currentSong);

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
        <div className="absolute bottom-0 w-full">
          <div>
            <div className="mx-8 my-5 rounded-xl shadow-[0_2px_15px_-1px_rgba(0,0,0,0.1)] px-5 py-5">
              <div className="flex justify-between items-center">
                <p className="sm:text-center flex items-center whitespace-nowrap">
                  <span className="text-sm font-medium">
                    {currentSong?.name.split(".")[0]}
                  </span>
                  {" - "}
                  <span className="text-xs text-gray-500">
                    {currentSong?.name.split(".")[1]}
                  </span>
                </p>

                <div className="flex items-center gap-5">
                  <Shuffle
                    className={clsx("cursor-pointer ", {
                      "text-[#2563EB]": isShuffle,
                    })}
                    size={15}
                    onClick={() => setIsShuffle((value) => !value)}
                  />
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
        </div>
      )}
    </>
  );
};

export default MusicController;
