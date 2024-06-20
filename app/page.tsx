import { getFileNames } from "@/actions";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const fileNames = getFileNames();

  return (
    <main>
      <AudioPlayer fileNames={fileNames} />
    </main>
  );
}
