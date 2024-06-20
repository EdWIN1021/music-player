import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface MusicContextProps {
  trackIndex: number;
  isPlaying: boolean;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const MusicContext = createContext<MusicContextProps>({
  trackIndex: 0,
  isPlaying: false,
  setTrackIndex: () => {},
  setIsPlaying: () => {},
});

const MusicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const contextValue: MusicContextProps = {
    trackIndex,
    isPlaying,
    setTrackIndex,
    setIsPlaying,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
