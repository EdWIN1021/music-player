import React, { FC, useContext, useEffect, useRef } from "react";
import { Play, Pause, ArrowRightToLine, ArrowLeftToLine } from "lucide-react";
import { MusicContext } from "@/music-provider";

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

      <div className="flex flex-col items-center p-3 gap-2">
        <div className="flex justify-center">
          <div className="flex gap-5 items-center">
            <ArrowLeftToLine
              className="cursor-pointer"
              onClick={handlePrevious}
            />
            <div
              className="border rounded-full p-1.5 border-slate-950 cursor-pointer"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="fill-slate-950 stroke-none" />
              ) : (
                <Play className="fill-slate-950 stroke-none" />
              )}
            </div>
            <ArrowRightToLine className="cursor-pointer" onClick={handleNext} />
          </div>
        </div>

        <input className="w-[700px]" type="range" />
      </div>
    </>
  );
};

export default MusicController;
