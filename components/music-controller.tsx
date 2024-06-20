import React, { FC, useContext, useEffect, useRef } from "react";
import { Play, Pause, ArrowRightToLine, ArrowLeftToLine } from "lucide-react";
import { MusicContext } from "@/music-provider";
import { Slider } from "./ui/slider";

interface MusicControllerProps {
  fileNames: string[];
}

const MusicController: FC<MusicControllerProps> = ({ fileNames }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const handleEnded = () => {
    setTrackIndex((prev) => (prev + 1) % fileNames.length);
  };

  const handlePrevious = () => {
    setTrackIndex((prev) => (prev - 1) % fileNames.length);
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
        <div className="flex flex-col justify-center px-5">
          <span className="text-md font-medium text-slate-200">
            {fileNames[trackIndex].split("_")[0]}
          </span>
          <span className="text-sm text-gray-500">
            {fileNames[trackIndex].split("_")[1]}
          </span>
        </div>

        <div className="flex flex-col items-center py-2 gap-2  flex-1">
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
                  <Pause className="fill-slate-950 stroke-slate-200 " />
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

          <Slider className="w-1/2" />
        </div>

        <div></div>
      </div>
    </>
  );
};

export default MusicController;
