import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/layout/header";
import React from "react";
import {ThemeProvider} from "@/providers/theme-provider";
import Footer from "@/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSS-AI | AI help enhancing component style",
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
      <main className="h-screen w-full">
        <div className="max-w-7xl mx-auto grid grid-rows-[auto_1fr_auto] h-full">
          <Header/>
          {children}
          <Footer/>
        </div>
      </main>
    </ThemeProvider>
    </body>
    </html>
  );
}
