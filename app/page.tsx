import { getFileNames } from "@/actions";

export default function Home() {
  const fileNames = getFileNames();

  return (
    <main>
      <div>
        <audio controls preload="none">
          <source
            src={`music/${
              fileNames[Math.floor(Math.random() * fileNames.length)]
            }`}
            type="audio/mp3"
          />
        </audio>
      </div>
    </main>
  );
}
