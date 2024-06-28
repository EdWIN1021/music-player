import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import MusicProvider from "@/music-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import clsx from "clsx";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Player",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={clsx(`h-[100vh] flex flex-col`, nunito.className)}>
        <MusicProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </MusicProvider>
      </body>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/ffmpeg/0.12.10/umd/ffmpeg.min.js"
        integrity="sha512-j2FJMGBh+AdPWKCKDqIzH67vu4ps8OsNZqqetz8YSlbwy2ZwFTL+p6Hp1j17nL0B7IDl9E4zhPUXZKwz7MzjQQ=="
        crossorigin="anonymous"
        async
      />
    </html>
  );
}
