import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Play, Pause, StepForward, StepBack } from "lucide-react";
import { MusicContext } from "@/music-provider";

interface MusicControllerProps {
  songs: Song[];
}

const MusicController: FC<MusicControllerProps> = ({ songs }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLInputElement>(null);
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
    setTrackIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    setTrackIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % songs.length);
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="hidden">
        {songs.length > 0 && (
          <>
            <audio controls ref={audioRef} preload="none" onEnded={handleEnded}>
              <source src={songs[trackIndex].download_url} type="audio/mp3" />
            </audio>
          </>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <div>
          <div className="mx-8 my-5 rounded-xl shadow-[0_2px_15px_-1px_rgba(0,0,0,0.1)] px-5 py-5">
            <div className="flex justify-between items-center">
              <p className="sm:text-center flex items-center">
                <span className="text-sm font-medium">
                  {songs[trackIndex].name.split("_")[0] + " - "}
                </span>
                <span className="text-xs text-gray-500">
                  {songs[trackIndex].name.split("_")[1].split(".")[0]}
                </span>
              </p>

              <div className="hidden sm:flex flex-1 items-center mx-20 gap-5">
                <input
                  className="h-1 block flex-1"
                  type="range"
                  ref={seekBarRef}
                  defaultValue={0}
                  max="100"
                  onChange={handleSeekChange}
                  onInput={handleSeekChange}
                />
                <span className="text-sm text-gray-500">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
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
      </div>
    </>
  );
};

export default MusicController;
