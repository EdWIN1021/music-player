import YoutubeToMp3Form from "@/components/YoutubeToMp3Form";
import MusicPlayer from "@/components/music-player";

export default async function Home() {
  const response = await fetch(
    "https://api.github.com/repos/EdWIN1021/music/contents"
  );
  const songs = await response.json();

  return (
    <>
      <MusicPlayer songs={songs} />
    </>
  );
}
