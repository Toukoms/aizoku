import React from 'react';
import type {Metadata} from "next";
import "./globals.css";
import "./custom.css"

export const metadata: Metadata = {
  title: "AIZUKO | Local chat AI with Ollama",
  description: "Chat with AI everywhere, every time.",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{name: "Tokiniaina"}],
  metadataBase: new URL("https://aizuko.app"), // TODO: to change after deployement
  openGraph: {
    title: "AIZUKO",
    description: "Chat with AI everywhere, every time.",
    url: "https://aizuko.app", // TODO: to change after deployement
    siteName: "AIZUKO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIZUKO",
    description: "Chat with AI everywhere, every time.",
    creator: "@toki965",
  },
};

function RootLayout(
  {children}: {
    children: React.ReactNode;
  }
) {
  return (
    <html
      lang="en"
    >
    <body
    >
    {children}
    </body>
    </html>
  );
}

export default RootLayout;