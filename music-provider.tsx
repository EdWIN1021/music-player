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
  search: string;
  trackIndex: number;
  isPlaying: boolean;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const MusicContext = createContext<MusicContextProps>({
  search: "",
  trackIndex: 0,
  isPlaying: false,
  setTrackIndex: () => {},
  setIsPlaying: () => {},
  setSearch: () => {},
});

const MusicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");

  const contextValue: MusicContextProps = {
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
