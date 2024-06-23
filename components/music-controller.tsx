import React, { FC, useContext, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  ArrowRightToLine,
  ArrowLeftToLine,
  StepForward,
  StepBack,
  Volume1,
} from "lucide-react";
import { MusicContext } from "@/music-provider";

interface MusicControllerProps {
  fileNames: string[];
}

const MusicController: FC<MusicControllerProps> = ({ fileNames }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLInputElement>(null);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const { isPlaying, setIsPlaying, trackIndex, setTrackIndex } =
    useContext(MusicContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.load();
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [trackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (seekBarRef.current && audio.duration) {
        seekBarRef.current.value = (
          (audio.currentTime / audio.duration) *
          100
        ).toString();
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleEnded = () => {
    setTrackIndex((prev) => (prev + 1) % fileNames.length);
  };

  const handlePrevious = () => {
    setTrackIndex((prev) => (prev - 1 + fileNames.length) % fileNames.length);
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % fileNames.length);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekTime = (audio.duration / 100) * parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audio.currentTime = seekTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      audio.volume = newVolume;
    }
  };

  return (
    <>
      <div className="hidden">
        {fileNames.length > 0 && (
          <>
            <audio controls ref={audioRef} preload="none" onEnded={handleEnded}>
              <source
                src={`/Users/edwin/Desktop/music/${fileNames[trackIndex]}.mp3`}
                type="audio/mp3"
              />
            </audio>
          </>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <div className="mx-8 my-5 rounded-xl shadow-[0_2px_15px_-1px_rgba(0,0,0,0.1)] flex justify-between px-5 py-5">
          <p className="sm:text-center flex items-center">
            <span className="text-sm font-medium">
              {fileNames[trackIndex].split("_")[0] + " - "}
            </span>

            <span className="text-xs text-gray-500">
              {fileNames[trackIndex].split("_")[1]}
            </span>
          </p>

          <div className="flex items-center gap-5">
            <StepBack
              className="cursor-pointer fill-black"
              onClick={handlePrevious}
            />

            <div
              className="rounded-full p-1 cursor-pointer shadow-2xl "
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

        {/* 

        <div className="flex flex-col items-center py-2 gap-2 flex-1">
          <div className="flex justify-center items-center">
            <div className="flex gap-5 items-center">
              <ArrowLeftToLine
                className="cursor-pointer "
                onClick={handlePrevious}
              />
              <div
                className="rounded-full p-1 cursor-pointer shadow-2xl "
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="fill-black" />
                ) : (
                  <Play className="fill-black" />
                )}
              </div>

              <ArrowRightToLine
                className="cursor-pointer "
                onClick={handleNext}
              />
            </div>
          </div>

          <input
            className="h-1 w-[70%]"
            type="range"
            ref={seekBarRef}
            defaultValue={0}
            max="100"
            onChange={handleSeekChange}
          />
        </div>

        <div className="hidden text-white flex items-center px-2">
          <Volume1 />
          <input
            className="h-0.5"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div> */}
      </div>
    </>
  );
};

export default MusicController;
