"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { initializeApi } from "./axios.js";

interface ApiProviderProps {
  children: React.ReactNode;
  baseUrl: string;
}

export const ApiProvider = ({ children, baseUrl }: ApiProviderProps) => {
  const [queryClient, _] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false, // Optional: disable refetching on window focus
            retry: 2, // Retry failed requests once
          },
        },
      }),
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeApi(baseUrl);
    setIsInitialized(true);
  }, [baseUrl]);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
