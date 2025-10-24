"use client";

import { ApiProvider } from "api";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not defined in the environment.",
    );
  }
  return (
    <ApiProvider baseUrl={apiUrl}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </ApiProvider>
  );
}
