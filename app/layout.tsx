import "./globals.css";
import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { SpotlightCursor } from "./components/SportlightCursor";
import { LoaderMarsDev } from "./components/LoaderMarsDev";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarsDev FullStack Developer",
  description:
    "Hi! I'm MarsDev, a FullStack Developer specialized in Next.ts and Node.ts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        antialiased
        min-h-screen
        text-slate-100
        relative
      `}
    >
       <LoaderMarsDev />
      {/* Glow que sigue al cursor, detrás de todo */}
      <SpotlightCursor />

      {/* Contenido */}
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </body>
    </html>
  );
}
