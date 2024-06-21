import * as actions from "@/actions";
import MusicPlayer from "@/components/music-player";

export default async function Home() {
  const fileNames = await actions.getSongNames();

  return <MusicPlayer fileNames={fileNames} />;
}
