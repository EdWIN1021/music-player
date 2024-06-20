import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Play, Pause, ArrowRightToLine, ArrowLeftToLine } from "lucide-react";
import { MusicContext } from "@/music-provider";
import { Slider } from "./ui/slider";

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
                src={`music/${fileNames[trackIndex]}.mp3`}
                type="audio/mp3"
              />
            </audio>
          </>
        )}
      </div>

      <div className="flex shadow-2xl bg-slate-950">
        <div className="flex flex-col justify-center px-5 gap-1">
          <span className="text-sm font-medium text-slate-200">
            {fileNames[trackIndex].split("_")[0]}
          </span>
          <span className="text-xs text-gray-500">
            {fileNames[trackIndex].split("_")[1]}
          </span>
        </div>

        <div className="flex flex-col items-center py-2 gap-2 flex-1">
          <div className="flex justify-center items-center">
            <div className="flex gap-5 items-center">
              <ArrowLeftToLine
                className="cursor-pointer text-slate-200"
                onClick={handlePrevious}
              />
              <div
                className="border rounded-full p-1 border-slate-200 cursor-pointer shadow-2xl bg-[white]"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="fill-slate-950 stroke-slate-200" />
                ) : (
                  <Play className="fill-slate-950 stroke-slate-200" />
                )}
              </div>
              <ArrowRightToLine
                className="cursor-pointer text-slate-200"
                onClick={handleNext}
              />
            </div>
          </div>

          <input
            className="h-1 w-1/2"
            type="range"
            ref={seekBarRef}
            defaultValue={0}
            max="100"
            onChange={handleSeekChange}
          />
          {/* <input
            className="h-1 w-1/2"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          /> */}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default MusicController;
