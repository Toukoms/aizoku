import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/providers/theme-provider";
import {SessionProvider} from "next-auth/react";
import MainLayout from "@/layout/main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIZUKO | AI help enhancing component style",
  description: "Generate style of your component from CSS-AI",
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{colorScheme: "dark"}}
    >
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <MainLayout>{children}</MainLayout>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
