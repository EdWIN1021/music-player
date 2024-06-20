import { getFileNames } from "@/actions";
import AudioPlayer from "@/components/AudioPlayer";
import Songs from "@/components/songs";

export default function Home() {
  const fileNames = getFileNames();

  return (
    <main>
      <Songs fileNames={fileNames} />
      <AudioPlayer fileNames={fileNames} />
    </main>
  );
}
