import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MusicProvider from "@/music-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="h-[100vh] flex flex-col">
        <MusicProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </MusicProvider>
      </body>
    </html>
  );
}
