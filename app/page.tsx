import MusicPlayer from "@/components/music-player";

export default async function Home() {
  const response = await fetch(
    "https://api.github.com/repos/EdWIN1021/muisc/contents"
  );
  const songs = await response.json();

  return <MusicPlayer songs={songs} />;
}
