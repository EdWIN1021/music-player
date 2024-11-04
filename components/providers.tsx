"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MusicProvider from "@/music-provider";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicProvider>{children}</MusicProvider>
    </QueryClientProvider>
  );
};

export default Providers;
