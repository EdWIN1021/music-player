import fs from "fs";
import path from "path";
import MusicPlayer from "@/components/music-player";

export default async function Home() {
  // const postsDirectory = path.join(process.cwd(), "music");
  // const filenames = await fs.promises.readdir(postsDirectory);

  // console.log(filenames);

  const response = await fetch(
    "https://api.github.com/repos/EdWIN1021/music-player/contents/music",
    { cache: "no-store" }
  );

  const songs = await response.json();

  return <>{<MusicPlayer songs={songs} />}</>;
}
