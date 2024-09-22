import MusicPlayer from "@/components/music-player";

export default async function Home() {
  const response = await fetch(
    "https://api.github.com/repos/EdWIN1021/music-player/contents/music",
    {
      cache: "no-store",
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  const songs = await response.json();

  return <>{<MusicPlayer songs={songs} />}</>;
}
