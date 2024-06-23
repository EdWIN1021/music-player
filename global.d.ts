// global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    input: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & {
      webkitdirectory?: string;
      directory?: string;
    };
  }
}

interface Song {
  name: string;
  download_url: string;
}
