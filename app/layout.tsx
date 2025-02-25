import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Career Sensei",
  description: "Your all in one Ai Career Coach for getting industry insights, resume building & career planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head />
      <body
        style={{
          background: "radial-gradient(circle, rgba(10,4,19,1) 100%, rgba(133,40,224,0.9865196078431373) 100%, rgba(0,212,255,1) 100%)",
          minHeight: "100vh",
          margin: 0,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white"
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
