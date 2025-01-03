"use client";

import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface MusicContextProps {
  currentSong: Song | null;
  search: string;
  trackIndex: number;
  isPlaying: boolean;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
}

export const MusicContext = createContext<MusicContextProps>({
  currentSong: null,
  search: "",
  trackIndex: 0,
  isPlaying: false,
  setTrackIndex: () => {},
  setIsPlaying: () => {},
  setSearch: () => {},
  setCurrentSong: () => {},
});

const MusicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const contextValue: MusicContextProps = {
    currentSong,
    setCurrentSong,
    search,
    trackIndex,
    isPlaying,
    setTrackIndex,
    setIsPlaying,
    setSearch,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
