import { getFileNames } from "@/actions";
import MusicPlayer from "@/components/music-player";

export default function Home() {
  const fileNames = getFileNames();
  return <MusicPlayer fileNames={fileNames} />;
}
