import { getFileNames } from "@/actions";
import AudioPlayer from "@/components/AudioPlayer";
import PlayList from "@/components/play-list";

export default function Home() {
  const fileNames = getFileNames();

  return (
    <main>
      <PlayList fileNames={fileNames} />
      <AudioPlayer fileNames={fileNames} />
    </main>
  );
}
